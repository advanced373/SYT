using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using syt_backend.authentication;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
builder.Services.AddAuthorization();
builder.Services.AddCors();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSingleton<ITokenService, TokenService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(
        options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    ) ;

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

var scopeRequiredByApi = app.Configuration["AzureAd:Scopes"] ?? "";

app.MapGet("/users/add", (HttpContext httpContext) =>
{
    List<UserDTO> users = new List<UserDTO>();
    IEnumerable<string> lines = File.ReadLines("./database/users.txt");
    foreach (var line in lines)
    {
        var values = line.Split(',');
        users.Add(new UserDTO(values[0], values[1], values[2]));
    }
    return users;
})
.WithName("GetUsers")
.RequireAuthorization()
.WithOpenApi();

app.MapPost("/users", (User user) =>
{
    File.AppendAllText("./database/users.txt", $"\n{user.username},{user.email},{user.password}, {Role.User}");
    return;
})
.WithName("AddUser")
.AllowAnonymous()
.WithOpenApi();
app.MapPost("/users/login", (Credentials credentials, [FromServices] ITokenService tokenService) =>
{
    using (var reader = new System.IO.StreamReader("./database/users.txt"))
    {
        while (!reader.EndOfStream)
        {
            var line = reader.ReadLine();

            if (line.Contains(credentials.email))
            {
                if (line.Split(',')[2] == credentials.password)
                {
                    return Results.Ok(tokenService.GenerateToken(new User("", credentials.email, credentials.password, Role.User)));
                }
            }
        }

        reader.Close();
    }
    return Results.Unauthorized();
})
.WithName("CheckUser")
.AllowAnonymous()
.WithOpenApi();
app.MapGet("/thoughts", (HttpContext httpContext) =>
{
    List<Thought> thoughts = new List<Thought>();
    IEnumerable<string> lines = File.ReadLines("./database/thoughts.txt");
    foreach (var line in lines)
    {
        var values = line.Split(',');
        thoughts.Add(new Thought(values[0], values[1], new Author(values[2], values[3])));
    }
    return thoughts;
})
.WithName("GetThoughts")
.RequireAuthorization()
.WithOpenApi();

app.MapPost("/thoughts", (Thought thought) =>
{
    File.AppendAllText("./database/thoughts.txt", $"\n{thought.body},{thought.placedAt},{thought.author.name},{thought.author.image}");
    return;
})
.WithName("AddThought")
.RequireAuthorization()
.WithOpenApi();

app.Run();

public record UserDTO(string username, string email, string password);
public record Credentials(string email, string password);
public record User(string username, string email, string password, Role role);
public record Thought(string body, string placedAt, Author author);
public record Author(string name, string image);
public enum Role { Administrator =0, User = 1}

