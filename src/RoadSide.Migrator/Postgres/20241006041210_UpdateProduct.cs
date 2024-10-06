using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RoadSide.Migrator.Postgres
{
    /// <inheritdoc />
    public partial class UpdateProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sale",
                table: "products",
                newName: "sale_quantity");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "products",
                newName: "in_stock_quantity");

            migrationBuilder.AddColumn<int>(
                name: "availability",
                table: "products",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "availability",
                table: "products");

            migrationBuilder.RenameColumn(
                name: "sale_quantity",
                table: "products",
                newName: "sale");

            migrationBuilder.RenameColumn(
                name: "in_stock_quantity",
                table: "products",
                newName: "quantity");
        }
    }
}
