import { getAPIUrl } from "../Global";
import { Get, Patch, Post, Remove } from "../headerIntercepter";

export function distributorWorkorderGet(params = {}) {
    const url = getAPIUrl('sales_operation.distributor_workorder');
    return Get(url, params)
        .then(response => {
            return { data: response.data.results, count: response.data.count }
        })
}

export function distributorWorkorderDiscountUpdate(id, data) {
    const url = getAPIUrl('sales_operation.distributor_workorder', { id: id });
    return Patch(url, data)
        .then(response => {
            return { data: response.data }
        })
}

export function distributorWorkOrderCreditDiscountAmount(data) {
    const url = getAPIUrl('sales_operation.credit_discount');
    return Post(url, data)
}

export function distributorWorkOrderDeliveryFeesAmount(data) {
    const url = getAPIUrl('sales_operation.delivery_fees');
    return Post(url, data)
}

export function distributorValidateItemDiscount(data) {
    const url = getAPIUrl('sales_operation.validate_item_discount');
    return Post(url, data)
}

export function distributorApplyItemDiscount(data) {
    const url = getAPIUrl('sales_operation.apply_item_discount');
    return Post(url, data)
}


export function distributorWorkorderGetOne(id) {
    const url = getAPIUrl('sales_operation.distributor_workorder', { id: id });
    return Get(url)
        .then(response => {
            return response.data
        })
}

export function distributorWorkorderSummaryGet(id) {
    const url = getAPIUrl('sales_operation.workorder_summary', { id: id });
    return Get(url)
        .then(response => {
            return response.data
        })
}

export function WorkorderInvoiceSummaryGet(id) {
    const url = getAPIUrl('sales_operation.invoice_summary', { id: id });
    return Get(url)
        .then(response => {
            return response.data
        })
}

export function WorkorderInvoiceDiscountUpdate(id, data) {
    const url = getAPIUrl('sales_operation.invoice', { id: id });
    return Patch(url, data)
        .then(response => {
            return { data: response.data }
        })
}

export function WorkOrderInvoiceGet(params = {}) {
    const url = getAPIUrl('sales_operation.invoice');
    return Get(url, params)
}

export function distributorWorkorderAddressGet(params = {}) {
    const url = getAPIUrl('sales_operation.distributor_workorder_address');
    return Get(url, params)
        .then(response => {
            return { data: response.data.results, count: response.data.count }
        })
}

export function distributorWorkorderAddressRemove(id) {
    const url = getAPIUrl('sales_operation.distributor_workorder_address', { id: id });
    return Remove(url)
}

export function distributorWorkorderPost(data) {
    const url = getAPIUrl('sales_operation.distributor_workorder');
    return Post(url, data)
}


export function distributorWorkorderUpdate(id, data) {
    const url = getAPIUrl('sales_operation.distributor_workorder', { id: id });
    return Patch(url, data)
}


export function sales_workorder(id, params = {}) {
    const url = getAPIUrl('profile.sales_representative_work_order', { id: id });
    return Get(url, params)
        .then(response => {
            return { data: response.data.results, count: response.data.count }
        })
}

export function distributor_sales_representative(id, params = {}) {
    const url = getAPIUrl('profile.distributor_sales_representative', { id: id });
    return Get(url, params)
        .then(response => {
            return { data: response.data.results, count: response.data.count }
        })
}


export function distributorWorkorderBulkAddressPost(data) {
    const url = getAPIUrl('sales_operation.distributor_bulk_workorder_address');
    return Post(url, data)
}


export function centraleGet(id = null, params = {}) {
    const url = getAPIUrl('profile.centrale', { id: id });
    return Get(url)
        .then(response => response.data.results)
}

export function locationItemGet(params = {}) {
    const url = getAPIUrl('sales_operation.distributor_workorder_item');
    return Get(url, params)
        .then(response => {
            return { data: response.data.results, count: response.data.count }
        })
}


export function locationGroupItemGet(params = {}) {
    const url = getAPIUrl('sales_operation.workorder_group_items');
    return Get(url, params)
        .then(response => response.data.results)
}

export function locationItemUpdate(id, data) {
    const url = getAPIUrl('sales_operation.distributor_workorder_item', { id: id });
    return Patch(url, data)
}


export function locationItemRemove(id) {
    const url = getAPIUrl('sales_operation.distributor_workorder_item', { id: id });
    return Remove(url)
}


export function distributorWorkorderItemAdd(data) {
    const url = getAPIUrl('sales_operation.distributor_workorder_item');
    return Post(url, data)
}


export function distributorWorkorderGroupChangeAdd(data) {
    const url = getAPIUrl('sales_operation.workorder_group_update');
    return Post(url, data)
}

export function generateWorkOrderItemCredit(data) {
    const url = getAPIUrl('sales_operation.workorder_item_credit');
    return Post(url, data)
}


export function groupItemUpdate(id, data) {
    const url = getAPIUrl('sales_operation.workorder_item_group', { id: id });
    return Patch(url, data)
}

export function generateInvoicePost(data) {
    const url = getAPIUrl('sales_operation.generate_item_invoice');
    return Post(url, data)
}

export function generateSAVPDFPost(data) {
    const url = getAPIUrl('sales_operation.generate_item_sav');
    return Post(url, data)
}

export function generateCreditPDFPost(data) {
    const url = getAPIUrl('sales_operation.generate_items_credit');
    return Post(url, data)
}


export function generateDeliveryTicketPost(data) {
    const url = getAPIUrl('sales_operation.generate_group_delivery_ticket');
    return Post(url, data)
}

export function WorkOrderDocumentsGet(params = {}) {
    const url = getAPIUrl('sales_operation.workorder_documents');
    return Get(url, params)
        .then(response => {
            return { data: response.data.results, count: response.data.count }
        })
}


export function sendDocumentEmailPost(data) {
    const url = getAPIUrl('sales_operation.send_document_email');
    return Post(url, data)
}

export function createWorkOrderEntity(data) {
    const url = getAPIUrl('sales_operation.workorder_entity');
    return Post(url, data)
}

export function updateWorkOrderEntity(id, data) {
    const url = getAPIUrl('sales_operation.workorder_entity', { id: id });
    return Patch(url, data)
}

export function getWorkOrderEntity(params = {}) {
    const url = getAPIUrl('sales_operation.workorder_entity');
    return Get(url, params)
        .then(response => response)
}

export function getOneWorkOrderEntity(id = null) {
    const url = getAPIUrl('sales_operation.workorder_entity', { id: id });
    return Get(url).then(response => response.data)
}


export function generateAllDeliveryTicket(data) {
    const url = getAPIUrl('sales_operation.generate_all_delivery_ticket');
    return Post(url, data)
}

export function generateAllInvoice(data) {
    const url = getAPIUrl('sales_operation.generate_all_invoice');
    return Post(url, data)
}

export function getSAVCategories(params = {}) {
    const url = getAPIUrl('sales_operation.sav_category');
    return Get(url, params)
}

export function getSAVTypes(params = {}) {
    const url = getAPIUrl('sales_operation.sav_types');
    return Get(url, params)
}

export function createSAVTypes(data) {
    const url = getAPIUrl('sales_operation.sav_types');
    return Post(url, data)
}

export function getNotifications(data) {
    const url = getAPIUrl('sales_operation.distributor_notification');
    return Get(url, data)
}

export function RevenueAnalyticsGet(params = {}) {
    const url = getAPIUrl('admin_analytics.revenue_analytics');
    return Get(url, params)
}

export function WorkorderAnalyticsGet(params = {}) {
    const url = getAPIUrl('admin_analytics.workorder_analytics');
    return Get(url, params)
}

export function WorkorderCountAnalyticsGet(params = {}) {
    const url = getAPIUrl('admin_analytics.workorder_count_analytics');
    return Get(url, params)
}

export function InvoiceAnalyticsGet(params = {}) {
    const url = getAPIUrl('admin_analytics.invoice_ht_analytics');
    return Get(url,params)
}

export function InvoiceCountAnalyticsGet(params = {}) {
    const url = getAPIUrl('admin_analytics.invoice_count_analytics');
    return Get(url,params)
}

export function ProductAnalyticsGet(params = {}) {
    const url = getAPIUrl('admin_analytics.product_analytics');
    return Get(url, params)
}

export function SavAnalyticsGet(params = {}) {
    const url = getAPIUrl('admin_analytics.sav_analytics');
    return Get(url, params)
}

export function InventoryAnalyticsGet(params = {}) {
    const url = getAPIUrl('admin_analytics.inventory_analytics');
    return Get(url, params)
}

