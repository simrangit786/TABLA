import {Get, Patch, Post, Remove} from "../headerIntercepter";
import {getAPIUrl} from "../Global";


export function clientTypeGet(params = {}) {
  const url = getAPIUrl('profile.client_type');
  return Get(url, params)
    .then(response => response.data.results)
}


export function centraleGet(params = {}) {
  const url = getAPIUrl('profile.centrale');
  return Get(url, params)
    .then(response => response.data.results)
}


export function dbaGet(params = {}) {
  const url = getAPIUrl('profile.dba');
  return Get(url, params)
    .then(response => response.data.results)
}

export function groupGet(params = {}) {
  const url = getAPIUrl('profile.group');
  return Get(url, params)
}

export function groupGetOne(id = null) {
  const url = getAPIUrl('profile.group', {id: id});
  return Get(url).then(response => response.data)
}

export function priceListGet(params = {}) {
  const url = getAPIUrl('profile.price_list');
  return Get(url, params)
    .then(response => response.data.results)
}


export function addressGet(params = {}) {
  const url = getAPIUrl('profile.address');
  return Get(url, params)
    .then(response => response.data.results)
}

export function addressPost(data) {
  const url = getAPIUrl('profile.address');
  return Post(url, data)
}

export function addressClientPost(data) {
  const url = getAPIUrl('profile.add_client_address');
  return Post(url, data)
}

export function addressRemove(id) {
  const url = getAPIUrl('profile.address', {id: id});
  return Remove(url)
}

export function addressUpdate(id, data) {
  const url = getAPIUrl('profile.address', {id: id});
  return Patch(url, data)
}

export function groupUpdate(id, data) {
  const url = getAPIUrl('profile.group', {id: id});
  return Patch(url, data)
}

export function groupPost(data) {
  const url = getAPIUrl('profile.group');
  return Post(url, data)
}

export function salesRepresentativeUpdate(id, data) {
  const url = getAPIUrl('profile.sales_representative', {id: id});
  return Patch(url, data)
}

export function salesRepresentativePost(data) {
  const url = getAPIUrl('profile.sales_representative');
  return Post(url, data)
}


export function departmentGet(params = {}) {
  const url = getAPIUrl('profile.department');
  return Get(url, params)
    .then(response => response.data.results)
}

export function salesAnalytics(id) {
  const url = getAPIUrl('profile.sales_analytics', {id: id});
  return Get(url)
    .then(response => response.data.graph)
}

export function salesAnalyticsWorkOrder(id) {
  const url = getAPIUrl('profile.sales_analytics_workorder', {id: id});
  return Get(url)
}

export function serviceTypeGetOne(id) {
  const url = getAPIUrl('profile.service_type', {id: id});
  return Get(url)
    .then(response => response.data)
}


export function salesRepresentativeGet(params = {}) {
  const url = getAPIUrl('profile.sales_representative');
  return Get(url, params)
    .then(response => response.data.results)
}

export function salesRepresentativeGetOne(id) {
  const url = getAPIUrl('profile.sales_representative', {id: id});
  return Get(url)
    .then(response => response.data)
}

export function salesRepresentativeGetOneByUser(id) {
  const url = getAPIUrl('profile.sales_representative_user',{id: id});
  return Get(url)
  .then(response => response.data)
}


export function paymentModeGet(params = {}) {
  const url = getAPIUrl('profile.payment_mode');
  return Get(url, params)
    .then(response => response.data.results)
}


export function bankListGet(params = {}) {
  const url = getAPIUrl('profile.bank_list');
  return Get(url, params)
    .then(response => response.data.results)
}


export function distributorProfilePost(data) {
  const url = getAPIUrl('profile.distributor_profile');
  return Post(url, data)
    .then(response => {
      return response.data
    })
}

export function distributorProfileUpdate(id, data) {
  const url = getAPIUrl('profile.distributor_profile', {id: id});
  return Patch(url, data)
    .then(response => {
      return response.data
    })
}


export function distributorProfileGet(params = {}) {
  const url = getAPIUrl('profile.distributor_profile');
  return Get(url, params)
    .then(response => {
      return {data: response.data.results, count: response.data.count}
    })
}

export function distributorProfileGetOne(id = null) {
  const url = getAPIUrl('profile.distributor_profile', {id: id});
  return Get(url)
    .then(response => response.data)
}

export function distributorDiscountPost(data) {
  const url = getAPIUrl('profile.distributor_discount');
  return Post(url, data)
}

export function phoneNumberPost(data) {
  const url = getAPIUrl('profile.phone_number');
  return Post(url, data)
}

export function phoneNumberRemove(id) {
  const url = getAPIUrl('profile.phone_number', {id: id});
  return Remove(url)
}


export function distributorDiscountRemove(id) {
  const url = getAPIUrl('profile.distributor_discount', {id: id});
  return Remove(url)
}


export function phoneNumberUpdate(id, data) {
  const url = getAPIUrl('profile.phone_number', {id: id});
  return Patch(url, data)
}

export function distributorDiscountUpdate(id, data) {
  const url = getAPIUrl('profile.distributor_discount', {id: id});
  return Patch(url, data)
}

export function bankAdd(data) {
  const url = getAPIUrl('profile.distributor_bank');
  return Post(url, data)
}

export function bankUpdate(id, data) {
  const url = getAPIUrl('profile.distributor_bank', {id: id});
  return Patch(url, data)
}

export function bankRemove(id) {
  const url = getAPIUrl('profile.distributor_bank', {id: id});
  return Remove(url)
}


export function codificationAdd(data) {
  const url = getAPIUrl('profile.distributor_codification');
  return Post(url, data)
}

export function codificationUpdate(id, data) {
  const url = getAPIUrl('profile.distributor_codification', {id: id});
  return Patch(url, data)
}

export function codificationRemove(id, data) {
  const url = getAPIUrl('profile.distributor_codification', {id: id});
  return Remove(url, data)
}

export function contactAdd(data) {
  const url = getAPIUrl('profile.distributor_contact');
  return Post(url, data)
}

export function contactRemove(id) {
  const url = getAPIUrl('profile.distributor_contact', {id: id});
  return Remove(url)
}

export function contactUpdate(id, data) {
  const url = getAPIUrl('profile.distributor_contact', {id: id});
  return Patch(url, data)
}

export function profileGetOne(id) {
  const url = getAPIUrl('auth.profile', {id: id});
  return Get(url)
}

export function reset_password_code(data) {
  const url = getAPIUrl('auth.reset_password_code');
  return Post(url, data, false)
}

export function reset_code_verification(data) {
  const url = getAPIUrl('auth.reset_code_verification');
  return Post(url, data, false)
}

export function reset_password(data) {
  const url = getAPIUrl('auth.reset_password');
  return Post(url, data, false)
}

export function DistributorProfilePdfGetOne(id) {
    const url = getAPIUrl('export.distributor_profile', {id: id});
    return Get(url)
        .then(response => {
            return response.data
        })
}

export function setBillingAddressPost(data) {
  const url = getAPIUrl('profile.set_billing_address');
  return Post(url, data)
}

export function setConfirmationAddressPost(data) {
  const url = getAPIUrl('profile.set_confirmation_address');
  return Post(url, data)
}

export function setInvoiceAddressPost(data) {
  const url = getAPIUrl('profile.set_invoice_address');
  return Post(url, data)
}

export function salesProfileYearGet(params = {}) {
  const url = getAPIUrl('profile.sales_rep_year');
  return Post(url, params)
}

export function salesProfileOrderGet(params = {}) {
  const url = getAPIUrl('profile.sales_rep_order');
  return Post(url, params)
}

export function distributorsEmailPost(id) {
  const url = getAPIUrl('profile.distributor_email');
  return Post(url,{id})
}
