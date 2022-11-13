using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddHttpClient("", opt =>
{
    opt.BaseAddress = new Uri(builder.Configuration["ApiUrl"] ?? "");
    opt.DefaultRequestHeaders.Add(HeaderNames.Accept, "application/json");
});

builder.Services.AddSession(cfg =>
{
    cfg.IdleTimeout = new TimeSpan(0, 30, 0);
});

JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = "Cookies";
        options.DefaultChallengeScheme = "oidc";
    })
    .AddCookie("Cookies")
    .AddOpenIdConnect("oidc", options =>
    {
        options.Authority = builder.Configuration["Oidc.Authority"];

        options.ClientId = builder.Configuration["Oidc.ClientId"];
        options.ClientSecret = builder.Configuration["Oidc.ClientSecret"];
        options.ResponseType = builder.Configuration["Oidc.ResponseType"];

        options.SaveTokens = true;

        options.Scope.Add("profile");
        options.Scope.Add("API");
        options.Scope.Add("offline_access");

        options.GetClaimsFromUserInfoEndpoint = true;
    });

builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseSession();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages();

app.Run();
