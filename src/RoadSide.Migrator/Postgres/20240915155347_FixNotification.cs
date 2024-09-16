using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RoadSide.Migrator.Postgres
{
    /// <inheritdoc />
    public partial class FixNotification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_notifications_user_role_from_id",
                table: "notifications");

            migrationBuilder.DropForeignKey(
                name: "fk_notifications_user_role_to_id",
                table: "notifications");

            migrationBuilder.DropIndex(
                name: "ix_notifications_from_id",
                table: "notifications");

            migrationBuilder.DropColumn(
                name: "from_id",
                table: "notifications");

            migrationBuilder.AddColumn<bool>(
                name: "is_personal",
                table: "notifications",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "url",
                table: "notifications",
                type: "character varying(32767)",
                maxLength: 32767,
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_notifications_user_to_id",
                table: "notifications",
                column: "to_id",
                principalTable: "user",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_notifications_user_to_id",
                table: "notifications");

            migrationBuilder.DropColumn(
                name: "is_personal",
                table: "notifications");

            migrationBuilder.DropColumn(
                name: "url",
                table: "notifications");

            migrationBuilder.AddColumn<Guid>(
                name: "from_id",
                table: "notifications",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "ix_notifications_from_id",
                table: "notifications",
                column: "from_id");

            migrationBuilder.AddForeignKey(
                name: "fk_notifications_user_role_from_id",
                table: "notifications",
                column: "from_id",
                principalTable: "user_role",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_notifications_user_role_to_id",
                table: "notifications",
                column: "to_id",
                principalTable: "user_role",
                principalColumn: "id");
        }
    }
}
