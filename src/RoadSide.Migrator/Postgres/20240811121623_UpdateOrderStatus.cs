using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RoadSide.Migrator.Postgres
{
    /// <inheritdoc />
    public partial class UpdateOrderStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<int>(
                name: "order_status",
                table: "orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "order_status",
                table: "order_item",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
                name: "order_status",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "order_status",
                table: "order_item");
        }
    }
}
