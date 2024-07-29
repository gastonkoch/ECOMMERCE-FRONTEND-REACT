using Application.Interfaces;
using Application.Services;
using Domain.Interfaces;
using Infraestructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region Repository
builder.Services.AddSingleton<IMainRepository,MainRepository>();
#endregion

#region Service
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IOrderService, OrderService>();
#endregion

var proveedor = builder.Services.BuildServiceProvider();
var configuration = proveedor.GetService<IConfiguration>();

builder.Services.AddCors(opciones =>
{
    var fronendURL = configuration.GetValue<String>("frontend_url");

    opciones.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(fronendURL).AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
