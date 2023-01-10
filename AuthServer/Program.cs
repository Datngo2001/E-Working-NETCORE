using AuthServer.Data;
using AuthServer.Data.Entities;
using AuthServer.Singleton;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        options.UseSqlite($"Data Source=AuthServerDatabase.db");
    }
    else
    {
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        if (connectionString == null)
        {
            throw new Exception("No Connection String");
        }
        options.UseSqlServer(connectionString);
    }
});

builder.Services.AddIdentity<AppUser, AppRole>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedPhoneNumber = false;
                options.User.RequireUniqueEmail = true;
            })
                .AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    EnvironmentSingleton.SetInstance(isDevelopment: true);
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
