const fetch = require("node-fetch");
const { RESTDataSource } = require('apollo-datasource-rest');


// const baseURL = ` https://demo1544854.mockable.io/`
const baseURL = `https://malaichawso2.nvizible.co.za:8243/api/malaicha/1.0.0/collections`;

const Query = {
    greeting: () => 'Hello graphQL world!!!!',
    // partners: () => {
    //     return fetch(`${baseURL}/partners`, {
    //       method: 'GET',
    //       headers: { 
    //           'Content-Type': 'application/json',
    //           'Authorization': 'Bearer 91e3a99a-2917-3c4c-87cc-b4472bb77d43'
    //         },  
    //     }).then(res => res.json())
    // }
    partners: (_, __, { dataSources }) => {
        return dataSources.userAPI.getPartners();
    },
    stores: (_, __, {dataSources}) => {
        return dataSources.userAPI.getStores();
    },
    users: (_, {input}, {dataSources}) => {
        console.log(input);
        return dataSources.userAPI.getUsers(input);
    } 
};

module.exports= { Query };