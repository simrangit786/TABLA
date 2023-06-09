import { getEnvValue } from "./Environment";
import { include, reverse } from "named-urls";

const endpoint = {
  auth: include("auth/api/v1/", {
    user: "user/:id?/",
    login: "login/",
    profile: "profile/my_profile/",
    sales_representative: "profile/sales_representative/",
    password_change: "password-change/",
    reset_password_code: "reset-password-code/",
    reset_code_verification: "reset-code-verification/",
    reset_password: "reset-password/",
  }),
  profile: include("profile/api/v1/", {
    distributor_email: "distributor-email/",
    address: "address/:id?/",
    phone_number: "phone-number/:id?/",
    bank_list: "bank-list/:id?/",
    client_type: "client-type/:id?/",
    centrale: "centrale/:id?/",
    dba: "dba/:id?/",
    group: "group/:id?/",
    price_list: "price-list/:id?/",
    payment_mode: "payment-mode/:id?/",
    department: "department/:id?/",
    sales_representative: "sales-representative/:id?/",
    sales_representative_user: "sales-representative/:id/user/",
    distributor_profile: "distributor-profile/:id?/",
    distributor_codification: "distributor-codification/:id?/",
    distributor_bank: "distributor-bank/:id?/",
    distributor_contact: "distributor-contact/:id?/",
    distributor_discount: "distributor-discount/:id?/",
    add_client_address: "add-client-address/",
    set_billing_address: "set-client-address/",
    set_confirmation_address: "set-confirmation-address/",
    set_invoice_address: "set-invoice-address/",
    sales_representative_work_order: "sales-representative-work-order/:id/",
    distributor_sales_representative: "sales-representative-distributor/:id/",
    sales_analytics: "sales-representative-analytics/:id/",
    sales_analytics_workorder: "sales-representative-analytics-workorder/:id/",
    sales_rep_year: "sales-representative-years/",
    sales_rep_order: "sales-representative-order/",
  }),
  warehouse: include("warehouse/api/v1/", {
    category: "category/:id?/",
    category_name: "category-type/:id?/",
    supplier_address: "supplier-address/:id?/",
    warehouse_supplier: "warehouse-supplier/:id?/",
    variant: "variant/:id?/",
    variant_image: "variant-image/:id?/",
    variant_component: "variant-component/:id?/",
    product: "product/:id?/",
    variant_image_order_update: "variant-image/update_order/",
    container: "container/:id?/",
    container_item: "container-item/:id?/",
    search: "search/",
    colour_list: "colour-list/",
    site: "site/",
    component: "component/:id?/",
    component_image: "component-image/:id?/",
    component_colour_list:"component-colour-list/",
    component_image_order_update:"component-image/update_order"
  }),
  sales_operation: include("sales-operation/api/v1", {
    distributor_notification: "discount-notification/",
    distributor_workorder: "distributor-workorder/:id?/",
    distributor_workorder_address: "distributor-workorder-address/:id?/",
    distributor_bulk_workorder_address: "workorder-bulk-address-add/",
    distributor_workorder_item: "distributor-workorder-item/:id?/",
    workorder_group_items: "workorder-group-items/",
    workorder_group_update: "workorder-group-update/",
    workorder_summary: "workorder-summary/:id/",
    workorder_item_group: "distributor-workorder-item-group/:id?/",
    generate_item_invoice: "generate-items-invoice/",
    generate_item_sav: "generate-items-sav/",
    generate_items_credit: "generate-items-credit/",
    generate_group_delivery_ticket: "generate-group-delivery-ticket/",
    workorder_documents: "workorder-documents/",
    workorder_item_sav: "workorder-item-sav/",
    send_document_email: "send-document-email/",
    workorder_entity: "workorder-entity/:id?/",
    invoice_summary: "invoice-summary/:id/",
    invoice: "workorder-invoice/:id?/",
    generate_all_invoice: "generate-all-invoice/",
    generate_all_delivery_ticket: "generate-all-delivery-ticket/",
    workorder_item_credit: "workorder-item-credit/:id?/",
    credit_discount: "credit-discount/",
    delivery_fees: "delivery-fees/",
    validate_item_discount: "validate-item-discount/",
    apply_item_discount: "apply-item-discount/",
    sav_category: "sav-category/:id?/",
    sav_types: "sav-type/:id?/",
  }),
  export: include("export/api/v1", {
    barcode: "barcode/:id/",
    component_barcode: "component-barcode/:id/",
    etiquete_pdf: "etiquette-pdf/:id/",
    component_pdf: "component-pdf/:id/",
    distributor_profile: "distributor-pdf/:id/",
  }),
  admin_analytics: include("analytics/api/v1",{
    revenue_analytics: "revenue-analytics/",
    workorder_analytics: "workorder-analytics/",
    product_analytics: "product-analytics/",
    sav_analytics: "sav-analytics/",
    invoice_ht_analytics: "invoice-ht-analytics/",
    invoice_count_analytics: "invoice-count-analytics/",
    workorder_count_analytics: "workorder-count-analytics/",
    inventory_analytics: "inventair-analytics/"
  })
};

export const methods = {
  create: "create",
  view: "view",
  edit: "edit",
};

export const order_type = {
  store_display: "store_display",
  customer_purchase: "customer_purchase",
  stock: "stock",
  expo: "expo",
  not_applicable: "",
};

export const workorder_view_state = {
  summary: "summary",
  generate_invoice: "generate_invoice",
  delivery_setting: "delivery_setting",
  delivery_ticket: "delivery_ticket",
  generate_credit: "generate_credit",
  create_sav: "create_sav",
};

export const profiles = {
  supplier: "supplier",
  qcs: "qcs",
  sales_agent: "sales-agent",
  director: "director",
  distributor: "distributor",
  vendor: "vendor",
  e_commerce: "e-commerce",
};

export function getAPIUrl(url, params = null) {
  const path = reverse(
    url.split(".").reduce((o, i) => o[i], endpoint),
    params
  );
  return getEnvValue("REACT_APP_API_URL") + path;
}
