using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RoadSide.Migrator.Postgres
{
    /// <inheritdoc />
    public partial class AddNotification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "notifications",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_on = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    from_id = table.Column<Guid>(type: "uuid", nullable: false),
                    to_id = table.Column<Guid>(type: "uuid", nullable: false),
                    content = table.Column<string>(type: "character varying(32767)", maxLength: 32767, nullable: false),
                    user_role_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_notifications", x => x.id);
                    table.ForeignKey(
                        name: "fk_notifications_user_role_from_id",
                        column: x => x.from_id,
                        principalTable: "user_role",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_notifications_user_role_to_id",
                        column: x => x.to_id,
                        principalTable: "user_role",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_notifications_user_role_user_role_id",
                        column: x => x.user_role_id,
                        principalTable: "user_role",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "ix_notifications_from_id",
                table: "notifications",
                column: "from_id");

            migrationBuilder.CreateIndex(
                name: "ix_notifications_to_id",
                table: "notifications",
                column: "to_id");

            migrationBuilder.CreateIndex(
                name: "ix_notifications_user_role_id",
                table: "notifications",
                column: "user_role_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "notifications");
        }
    }
}
