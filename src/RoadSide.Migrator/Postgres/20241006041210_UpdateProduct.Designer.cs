﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using RoadSide.Infrastructure.Persistence;

#nullable disable

namespace RoadSide.Migrator.Postgres
{
    [DbContext(typeof(CoreDbContext))]
    [Migration("20241006041210_UpdateProduct")]
    partial class UpdateProduct
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ProductsVoucher", b =>
                {
                    b.Property<Guid>("AppliedProductsId")
                        .HasColumnType("uuid")
                        .HasColumnName("applied_products_id");

                    b.Property<Guid>("VouchersId")
                        .HasColumnType("uuid")
                        .HasColumnName("vouchers_id");

                    b.HasKey("AppliedProductsId", "VouchersId")
                        .HasName("pk_products_voucher");

                    b.HasIndex("VouchersId")
                        .HasDatabaseName("ix_products_voucher_vouchers_id");

                    b.ToTable("products_voucher", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.AppSettings", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_on");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<DateTime>("LastModifiedOn")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("last_modified_on");

                    b.Property<string>("ReferenceKey")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("reference_key");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("type");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("value");

                    b.HasKey("Id")
                        .HasName("pk_app_settings");

                    b.ToTable("app_settings", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("BaseCategoryId")
                        .HasColumnType("integer")
                        .HasColumnName("base_category_id");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("url");

                    b.HasKey("Id")
                        .HasName("pk_category");

                    b.HasIndex("BaseCategoryId")
                        .HasDatabaseName("ix_category_base_category_id");

                    b.ToTable("category", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Notifications", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(32767)
                        .HasColumnType("character varying(32767)")
                        .HasColumnName("content");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_on");

                    b.Property<bool>("IsPersonal")
                        .HasColumnType("boolean")
                        .HasColumnName("is_personal");

                    b.Property<Guid>("ToId")
                        .HasColumnType("uuid")
                        .HasColumnName("to_id");

                    b.Property<string>("Url")
                        .HasMaxLength(32767)
                        .HasColumnType("character varying(32767)")
                        .HasColumnName("url");

                    b.Property<Guid?>("UserRoleId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_role_id");

                    b.HasKey("Id")
                        .HasName("pk_notifications");

                    b.HasIndex("ToId")
                        .HasDatabaseName("ix_notifications_to_id");

                    b.HasIndex("UserRoleId")
                        .HasDatabaseName("ix_notifications_user_role_id");

                    b.ToTable("notifications", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.OrderItem", b =>
                {
                    b.Property<int>("OrderItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("order_item_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("OrderItemId"));

                    b.Property<Guid>("CreatedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("created_by");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_on");

                    b.Property<Guid>("LastModifiedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("last_modified_by");

                    b.Property<DateTime>("LastModifiedOn")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("last_modified_on");

                    b.Property<Guid>("OrderId")
                        .HasColumnType("uuid")
                        .HasColumnName("order_id");

                    b.Property<int>("OrderStatus")
                        .HasColumnType("integer")
                        .HasColumnName("order_status");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid")
                        .HasColumnName("product_id");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("quantity");

                    b.HasKey("OrderItemId")
                        .HasName("pk_order_item");

                    b.HasIndex("OrderId")
                        .HasDatabaseName("ix_order_item_order_id");

                    b.HasIndex("ProductId")
                        .HasDatabaseName("ix_order_item_product_id");

                    b.ToTable("order_item", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Orders", b =>
                {
                    b.Property<Guid>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("order_id");

                    b.Property<Guid>("CreatedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("created_by");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_on");

                    b.Property<Guid>("LastModifiedBy")
                        .HasColumnType("uuid")
                        .HasColumnName("last_modified_by");

                    b.Property<DateTime>("LastModifiedOn")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("last_modified_on");

                    b.Property<int>("OrderStatus")
                        .HasColumnType("integer")
                        .HasColumnName("order_status");

                    b.Property<int>("TotalPrice")
                        .HasColumnType("integer")
                        .HasColumnName("total_price");

                    b.HasKey("OrderId")
                        .HasName("pk_orders");

                    b.ToTable("orders", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Prices", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTimeOffset>("EndDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("end_date");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid")
                        .HasColumnName("product_id");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("start_date");

                    b.Property<int>("UnitPrice")
                        .HasColumnType("integer")
                        .HasColumnName("unit_price");

                    b.HasKey("Id")
                        .HasName("pk_prices");

                    b.HasIndex("ProductId")
                        .HasDatabaseName("ix_prices_product_id");

                    b.ToTable("prices", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Products", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<int>("Availability")
                        .HasColumnType("integer")
                        .HasColumnName("availability");

                    b.Property<int>("BaseUnitPrice")
                        .HasColumnType("integer")
                        .HasColumnName("base_unit_price");

                    b.Property<int>("CategoryId")
                        .HasColumnType("integer")
                        .HasColumnName("category_id");

                    b.Property<DateTimeOffset>("DateCreated")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date_created");

                    b.Property<DateTimeOffset>("DateModified")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date_modified");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("image_url");

                    b.Property<int>("InStockQuantity")
                        .HasColumnType("integer")
                        .HasColumnName("in_stock_quantity");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<int>("Rate")
                        .HasColumnType("integer")
                        .HasColumnName("rate");

                    b.Property<int>("SaleQuantity")
                        .HasColumnType("integer")
                        .HasColumnName("sale_quantity");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("unit");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("url");

                    b.Property<Guid>("VendorId")
                        .HasColumnType("uuid")
                        .HasColumnName("vendor_id");

                    b.HasKey("Id")
                        .HasName("pk_products");

                    b.HasIndex("CategoryId")
                        .HasDatabaseName("ix_products_category_id");

                    b.HasIndex("VendorId")
                        .HasDatabaseName("ix_products_vendor_id");

                    b.ToTable("products", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .HasMaxLength(32767)
                        .HasColumnType("character varying(32767)")
                        .HasColumnName("name");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(32767)
                        .HasColumnType("character varying(32767)")
                        .HasColumnName("normalized_name");

                    b.HasKey("Id")
                        .HasName("pk_role");

                    b.ToTable("role", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.RoleClaims", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text")
                        .HasColumnName("claim_type");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text")
                        .HasColumnName("claim_value");

                    b.Property<DateTimeOffset>("CreatedClaim")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_claim");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uuid")
                        .HasColumnName("role_id");

                    b.HasKey("Id")
                        .HasName("pk_role_claims");

                    b.HasIndex("RoleId")
                        .HasDatabaseName("ix_role_claims_role_id");

                    b.ToTable("role_claims", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer")
                        .HasColumnName("access_failed_count");

                    b.Property<string>("AdditionalPropertiesJson")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("additional_properties_json");

                    b.Property<string>("AddressJson")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("address_json");

                    b.Property<Guid>("Auth0UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("auth0user_id");

                    b.Property<string>("AvatarUrl")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("avatar_url");

                    b.Property<Guid>("AzureAdB2CUserId")
                        .HasColumnType("uuid")
                        .HasColumnName("azure_ad_b2c_user_id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("concurrency_stamp");

                    b.Property<DateTimeOffset>("DateOfBirth")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date_of_birth");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean")
                        .HasColumnName("email_confirmed");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(32767)
                        .HasColumnType("character varying(32767)")
                        .HasColumnName("full_name");

                    b.Property<int>("Gender")
                        .HasColumnType("integer")
                        .HasColumnName("gender");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean")
                        .HasColumnName("lockout_enabled");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("lockout_end");

                    b.Property<string>("NormalizedEmail")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("normalized_email");

                    b.Property<string>("NormalizedUserName")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("normalized_user_name");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("password_hash");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("phone_number");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean")
                        .HasColumnName("phone_number_confirmed");

                    b.Property<string>("SecurityStamp")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("security_stamp");

                    b.Property<string>("SessionId")
                        .HasMaxLength(512)
                        .HasColumnType("character varying(512)")
                        .HasColumnName("session_id");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean")
                        .HasColumnName("two_factor_enabled");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("user_name");

                    b.HasKey("Id")
                        .HasName("pk_user");

                    b.ToTable("user", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.UserClaims", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text")
                        .HasColumnName("claim_type");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text")
                        .HasColumnName("claim_value");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_user_claims");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_user_claims_user_id");

                    b.ToTable("user_claims", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.UserRole", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uuid")
                        .HasColumnName("role_id");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_user_role");

                    b.HasIndex("RoleId")
                        .HasDatabaseName("ix_user_role_role_id");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_user_role_user_id");

                    b.ToTable("user_role", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.UserTokens", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTimeOffset>("GeneratedTime")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("generated_time");

                    b.Property<string>("LoginProvider")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("login_provider");

                    b.Property<string>("TokenName")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("token_name");

                    b.Property<string>("TokenValue")
                        .IsRequired()
                        .HasMaxLength(2147483647)
                        .HasColumnType("text")
                        .HasColumnName("token_value");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_user_tokens");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_user_tokens_user_id");

                    b.ToTable("user_tokens", (string)null);
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Voucher", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<bool>("Active")
                        .HasColumnType("boolean")
                        .HasColumnName("active");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("code");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<int>("Discount")
                        .HasColumnType("integer")
                        .HasColumnName("discount");

                    b.Property<DateTimeOffset>("EndDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("end_date");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("start_date");

                    b.Property<int>("UsageLimit")
                        .HasColumnType("integer")
                        .HasColumnName("usage_limit");

                    b.HasKey("Id")
                        .HasName("pk_voucher");

                    b.ToTable("voucher", (string)null);
                });

            modelBuilder.Entity("ProductsVoucher", b =>
                {
                    b.HasOne("RoadSide.Core.Entities.Products", null)
                        .WithMany()
                        .HasForeignKey("AppliedProductsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_products_voucher_products_applied_products_id");

                    b.HasOne("RoadSide.Core.Entities.Voucher", null)
                        .WithMany()
                        .HasForeignKey("VouchersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_products_voucher_voucher_vouchers_id");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Category", b =>
                {
                    b.HasOne("RoadSide.Core.Entities.Category", "BaseCategory")
                        .WithMany("Categories")
                        .HasForeignKey("BaseCategoryId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .HasConstraintName("fk_category_category_base_category_id");

                    b.Navigation("BaseCategory");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Notifications", b =>
                {
                    b.HasOne("RoadSide.Core.Entities.User", "To")
                        .WithMany()
                        .HasForeignKey("ToId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("fk_notifications_user_to_id");

                    b.HasOne("RoadSide.Core.Entities.UserRole", null)
                        .WithMany("Notification")
                        .HasForeignKey("UserRoleId")
                        .HasConstraintName("fk_notifications_user_role_user_role_id");

                    b.Navigation("To");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.OrderItem", b =>
                {
                    b.HasOne("RoadSide.Core.Entities.Orders", "Order")
                        .WithMany("Items")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_order_item_orders_order_id");

                    b.HasOne("RoadSide.Core.Entities.Products", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired()
                        .HasConstraintName("fk_order_item_products_product_id");

                    b.Navigation("Order");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Prices", b =>
                {
                    b.HasOne("RoadSide.Core.Entities.Products", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_prices_products_product_id");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Products", b =>
                {
                    b.HasOne("RoadSide.Core.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_products_category_category_id");

                    b.HasOne("RoadSide.Core.Entities.User", "Vendor")
                        .WithMany()
                        .HasForeignKey("VendorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_products_user_vendor_id");

                    b.Navigation("Category");

                    b.Navigation("Vendor");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.RoleClaims", b =>
                {
                    b.HasOne("RoadSide.Core.Entities.Role", "Role")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_role_claims_role_role_id");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.UserClaims", b =>
                {
                    b.HasOne("RoadSide.Core.Entities.User", "Identity")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_user_claims_user_user_id");

                    b.Navigation("Identity");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.UserRole", b =>
                {
                    b.HasOne("RoadSide.Core.Entities.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_user_role_role_role_id");

                    b.HasOne("RoadSide.Core.Entities.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_user_role_user_user_id");

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.UserTokens", b =>
                {
                    b.HasOne("RoadSide.Core.Entities.User", null)
                        .WithMany("Tokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_user_tokens_user_user_id");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Category", b =>
                {
                    b.Navigation("Categories");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Orders", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.Role", b =>
                {
                    b.Navigation("Claims");

                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.User", b =>
                {
                    b.Navigation("Claims");

                    b.Navigation("Tokens");

                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("RoadSide.Core.Entities.UserRole", b =>
                {
                    b.Navigation("Notification");
                });
#pragma warning restore 612, 618
        }
    }
}
