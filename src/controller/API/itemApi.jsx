import {Get, Patch, Post, Remove} from "../headerIntercepter";
import {getAPIUrl} from "../Global";


export function itemCategoryGet(params = {}) {
    const url = getAPIUrl('warehouse.category');
    return Get(url, params)
        .then(response => response.data.results)
}

export function itemCategoryNameGet(params = {}) {
    const url = getAPIUrl('warehouse.category_name');
    return Get(url, params)
        .then(response => response.data.results)
}


export function colourListGet(params = {}) {
    const url = getAPIUrl('warehouse.colour_list');
    return Get(url, params)
        .then(response => response.data.results)
}


export function itemCategoryPost(data) {
    const url = getAPIUrl('warehouse.category');
    return Post(url, data)
}


export function productGet(params = {}) {
    const url = getAPIUrl('warehouse.product');
    return Get(url, params)
}



export function productAdd(data) {
    const url = getAPIUrl('warehouse.product');
    return Post(url, data)
}


export function variantGet(params = {}) {
    const url = getAPIUrl('warehouse.variant');
    return Get(url, params)
        .then(response => {
            return {items: response.data.results, count: response.data.count}
        })
}

export function PDFGetOne(id,params={}) {
    const url = getAPIUrl('export.barcode', {id: id});
    return Get(url, params)
        .then(response => {
            return response.data
        })
}


export function ComponentPDFGetOne(id) {
    const url = getAPIUrl('export.component_barcode', {id: id});
    return Get(url)
        .then(response => {
            return response.data
        })
}

export function EtiquetePDFGetOne(id) {
    const url = getAPIUrl('export.etiquete_pdf', {id: id});
    return Get(url)
        .then(response => {
            return response.data
        })
}


export function variantGetOne(id) {
    const url = getAPIUrl('warehouse.variant', {id: id});
    return Get(url)
        .then(response => {
            return response.data
        })
}

export function variantRemove(id) {
    const url = getAPIUrl('warehouse.variant', {id: id});
    return Remove(url)
}


// TODO: CHECH AND REMOVE variantFetchOne
export function variantFetchOne(id) {
    const url = getAPIUrl('warehouse.variant', {id: id});
    return Get(url)
        .then(response => {
            return {items: response.data, count: 1}
        })
}

// TODO: END

export function variantFetchOnePhoto(id) {
    const url = getAPIUrl('warehouse.variant_image_add', {variant_id: id});
    return Get(url)
        .then(response => {
            return {items: response.data}
        })
}


export function variantAdd(data) {
    const url = getAPIUrl('warehouse.variant');
    return Post(url, data)
}

export function variantUpdate(id, data) {
    const url = getAPIUrl('warehouse.variant', {id: id});
    return Patch(url, data)
}

export function variantComponentAdd(data) {
    const url = getAPIUrl('warehouse.variant_component');
    return Post(url, data)
}

export function variantComponentUpdate(id, data) {
    const url = getAPIUrl('warehouse.variant_component', {id: id});
    return Patch(url, data)
}

export function variantComponentRemove(id) {
    const url = getAPIUrl('warehouse.variant_component', {id: id});
    return Remove(url)
}


export function supplierGet(params = {}) {
    const url = getAPIUrl('warehouse.warehouse_supplier');
    return Get(url, params)
        .then(response => response.data.results)
}

export function siteGet(params = {}) {
    const url = getAPIUrl('warehouse.site');
    return Get(url, params)
        .then(response => response.data.results)
}

export function globalSearchGet(params = {}) {
    const url = getAPIUrl('warehouse.search');
    return Get(url, params)
}


export function supplierAdd(data) {
    const url = getAPIUrl('warehouse.warehouse_supplier');
    return Post(url, data)
}


export function supplierAddressAdd(data) {
    const url = getAPIUrl('warehouse.supplier_address');
    return Post(url, data)
}


export function supplierAddressUpdate(id, data) {
    const url = getAPIUrl('warehouse.supplier_address', {id: id});
    return Patch(url, data)
}


export function variantImageAdd(data) {
    const url = getAPIUrl('warehouse.variant_image');
    return Post(url, data)
}


export function variantImageRemove(id) {
    const url = getAPIUrl('warehouse.variant_image', {id: id});
    return Remove(url)
}


export function variantImageOrderUpdate(data) {
    const url = getAPIUrl('warehouse.variant_image_order_update');
    return Post(url, data)
}

export function containerAdd(data) {
    const url = getAPIUrl('warehouse.container');
    return Post(url, data)
}


export function containerUpdate(id, data) {
    const url = getAPIUrl('warehouse.container', {id: id});
    return Patch(url, data)
}

export function containerGet(params = {}) {
    const url = getAPIUrl('warehouse.container');
    return Get(url, params)
        .then(response => {
            return {data: response.data.results, count: response.data.count}
        })
}

export function containerGetOne(id) {
    const url = getAPIUrl('warehouse.container', {id: id});
    return Get(url)
        .then(response => {
            return response.data
        })
}

export function containerItemAdd(data) {
    const url = getAPIUrl('warehouse.container_item');
    return Post(url, data)
}

export function containerItemGet(params = {}) {
    const url = getAPIUrl('warehouse.container_item');
    return Get(url, params)
        .then(response => {
            return {items: response.data.results, count: response.data.count}
        })
}

export function containerItemUpdate(id, data) {
    const url = getAPIUrl('warehouse.container_item', {id: id});
    return Patch(url, data)
}

export function containerItemRemove(id) {
    const url = getAPIUrl('warehouse.container_item', {id: id});
    return Remove(url)
}

export function ComponentGet(params = {}) {
    const url = getAPIUrl('warehouse.component');
    return Get(url, params)
        .then(response => {
            return {items: response.data.results, count: response.data.count}
        })
}

export function ComponentAdd(data) {
    const url = getAPIUrl('warehouse.component');
    return Post(url, data)
}

export function ComponentUpdate(id, data) {
    const url = getAPIUrl('warehouse.component', {id: id});
    return Patch(url, data)
}

export function componentGetOne(id) {
    const url = getAPIUrl('warehouse.component', {id: id});
    return Get(url)
        .then(response => {
            return response.data
        })
}

export function componentImageAdd(data) {
    const url = getAPIUrl('warehouse.component_image');
    return Post(url, data)
}


export function componentImageRemove(id) {
    const url = getAPIUrl('warehouse.component_image', {id: id});
    return Remove(url)
}


export function componentImageOrderUpdate(data) {
    const url = getAPIUrl('warehouse.component_image_order_update');
    return Post(url, data)
}

export function componentColourListGet(params = {}) {
    const url = getAPIUrl('warehouse.component_colour_list');
    return Get(url, params)
        .then(response => response.data.results)
}