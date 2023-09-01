using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.Resource;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
builder.Services.AddAuthorization();
builder.Services.AddCors();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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

var scopeRequiredByApi = app.Configuration["AzureAd:Scopes"] ?? "";
app.MapGet("/users", (HttpContext httpContext) =>
{
    List<User> thoughts = new List<User>();
    IEnumerable<string> lines = File.ReadLines("./database/users.txt");
    foreach (var line in lines)
    {
        var values = line.Split(',');
        thoughts.Add(new User(values[0], values[1], values[2]));
    }
    return thoughts;
})
.WithName("GetUsers")
.WithOpenApi();

app.MapPost("/users", (User user) =>
{
    File.AppendAllText("./database/users.txt", $"\n{user.username},{user.email},{user.password}");
    return;
})
.WithName("AddUser")
.WithOpenApi();
app.MapPost("/users", (Credentials credentials) =>
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
                    return true;
                }
            }
        }

        reader.Close();
    }
    return false;
})
.WithName("CheckUser")
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
.WithOpenApi();

app.MapPost("/thoughts", (Thought thought) =>
{
    File.AppendAllText("./database/thoughts.txt", $"\n{thought.body},{thought.placedAt},{thought.author.name},{thought.author.image}");
    return;
})
.WithName("AddThought")
.WithOpenApi();

app.Run();

internal record User(string username, string email, string password);
internal record Credentials (string email, string password);
internal record Thought(string body, string placedAt, Author author);
internal record Author(string name, string image);

