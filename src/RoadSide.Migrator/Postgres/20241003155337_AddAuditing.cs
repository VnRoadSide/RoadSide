using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RoadSide.Migrator.Postgres
{
    /// <inheritdoc />
    public partial class AddAuditing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "date_created",
                table: "order_item",
                newName: "last_modified_on");

            migrationBuilder.AddColumn<DateTime>(
                name: "created_on",
                table: "orders",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "last_modified_by",
                table: "orders",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "last_modified_on",
                table: "orders",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "created_on",
                table: "order_item",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "last_modified_by",
                table: "order_item",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "user_id",
                table: "order_item",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "created_on",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "last_modified_by",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "last_modified_on",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "created_on",
                table: "order_item");

            migrationBuilder.DropColumn(
                name: "last_modified_by",
                table: "order_item");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "order_item");

            migrationBuilder.RenameColumn(
                name: "last_modified_on",
                table: "order_item",
                newName: "date_created");
        }
    }
}
