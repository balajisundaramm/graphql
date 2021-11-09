const { RESTDataSource } = require('apollo-datasource-rest');
const fetch = require("node-fetch");


class UserAPI extends RESTDataSource {
    constructor() {
        super();
        this.token = 'cea076da-773d-33ea-9090-54080983b135';
        this.baseURL = 'https://malaichawso2.nvizible.co.za:8243/api/malaicha/1.0.0/collections';
    }


    willSendRequest(request) {
        console.log('append token ')
        if(this.token) {
            request.headers.set('Authorization', 'Bearer ' + this.token);
        } else {
            console.log('logging in...........')
            this.token = this.login('sudhakar', 'Test@123');
        }
    }

    getPartners() {
        return this.get(`/partners`);
    }

    getStores() {
        return this.get(`/stores`);
    }

    getUsers(input) {
        console.log(input)
        return this.post(`/users/details`,
            input
        )
    }

    login(userName, password) {
        return fetch(`https://malaichawso2.nvizible.co.za:8243/token`, {
                  method: 'POST',
                  headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic UnRqYThSNk12a2pLMFFOQVlTY0FiaFFZUVBVYTpvNTIxbXM4OWswbjFDMGRrZ2hyRkl6dENXb0Vh'        
                    },
                    body: JSON.stringify({
                        'grant_type': 'password',
                        'username': userName, 
                        'password': password,
                        'scope': 'malaicha_collection_counter malaicha_registration_counter malaicha_ticket_station malaicha_packing_station ' +
                        'malaicha_collection_admin malaicha_collection_order_details malaicha_collection_create_ticket malaicha_collection_assign_ticket ' +
                        'malaicha_collection_reassign_ticket malaicha_collection_get_tickets malaicha_collection_get_packers ' +
                        'malaicha_collection_get_collection_counters malaicha_collection_get_registration_counters malaicha_collection_update_ticket ' +
                        'malaicha_collection_racks malaicha_collection_counter_ticket malaicha_collection_deliver malaicha_collection_packer_tickets ' +
                        'malaicha_collection_points malaicha_collection_point_orders malaicha_collection_users malaicha-collection-point ' +
                        'malaicha_collection_add_store malaicha_collection_edit_store_details malaicha_collection_edit_store_status ' +
                        'malaicha_voucher_admin malaicha_reference_data malaicha_create_store_user malaicha_reset_store_user_password malaicha_set_user_password ' + 
                        'malaicha_get_all_store_users malaicha_activate_deactivate_store_user malaicha_get_user_details_by_user_name '+
                        'malaicha_collection_edit_store_timings  malaicha_malawi_store_manager_accept_orders malaicha_order_refund malaicha_add_store malaicha_malawi_statuses '+
                        ' malaicha_malawi_store_manager_get_orders '+
                        'malaicha_delivery_get_cash_order malaicha_accept_cash_payment'
                    })
                }).then(res => {
                    console.log(res)
                    res.json().access_token;
                    // this.token = response.accessToken
                })
    }
}

module.exports = UserAPI;