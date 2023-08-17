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

app.MapGet("/thoughts", (HttpContext httpContext) =>
{
    List<Thought> thoughts = new List<Thought>();
    IEnumerable<string> lines = File.ReadLines("./database.txt");
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
    File.AppendAllText("./database.txt", $"\n{thought.Body},{thought.PlacedAt},{thought.author.name},{thought.author.image}");
    return;
})
.WithName("AddThought")
.WithOpenApi();

app.Run();

internal record Thought(string Body, string PlacedAt, Author author);
internal record Author(string name, string image);
