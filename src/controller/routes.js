import {include} from 'named-urls'


export const routes = {
    login: '/',
    logout: '/logout/',
    forget_password: '/forgot-password/',
    dashboard: include('/dashboard', {
        self: '',
        sales_analytics:'sales-person/analytics/',
        sales_workorder_analytics:'sales-person/workorder-analytics/',

        distributor:include('distributor',{
            self:'',
            view:':id/',
        }),
        profiles: include('profiles', {
            self: 'all/',
            distributor: include('distributor', {
                self: '',
                method: ':method/:id?/',
            }),
            groups: include('groups', {
                self: '',
                method: ':method/:id?/',
            }),
            representative: include('representative', {
                self: '',
                method: ':method/:id?/',
            }),
            entity: include('entity', {
                self: '',
                method: ':method/:id?/',
            }),
            tarifaire: include("tarifaire",{
                self:'',
                method:':method/:id?/'
            }),
            tarifs: include("tarifs",{
                self:'',
                method:':method/:id?/'
            })
        }),
        warehouse: include('warehouse', {
            self: 'all/',
            item: 'item/:method/:id?/',
            inventory: 'inventory/',
            component: 'component/',
            componentItem:"component/:method/:id?/",
            container: include('container', {
                self: '',
                method: ':method/:id?/'
            }),
        }),
        sales: include('sales-operations', {
            self: 'all/',
            work_order: include('work-order', {
                self: '',
                method: ':type/:method/:id?/',
            }),
            invoice:':type/:workorderId/invoice/:id/'
        }),
    })
};
