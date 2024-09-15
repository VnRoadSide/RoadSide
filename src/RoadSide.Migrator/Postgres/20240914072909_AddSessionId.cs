using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RoadSide.Migrator.Postgres
{
    /// <inheritdoc />
    public partial class AddSessionId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "full_name",
                table: "user",
                type: "character varying(32767)",
                maxLength: 32767,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "session_id",
                table: "user",
                type: "character varying(512)",
                maxLength: 512,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "normalized_name",
                table: "role",
                type: "character varying(32767)",
                maxLength: 32767,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "role",
                type: "character varying(32767)",
                maxLength: 32767,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "session_id",
                table: "user");

            migrationBuilder.AlterColumn<string>(
                name: "full_name",
                table: "user",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(32767)",
                oldMaxLength: 32767);

            migrationBuilder.AlterColumn<string>(
                name: "normalized_name",
                table: "role",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(32767)",
                oldMaxLength: 32767,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "role",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(32767)",
                oldMaxLength: 32767,
                oldNullable: true);
        }
    }
}
