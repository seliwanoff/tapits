import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/account/dashboard.vue'
import Register from '../views/panel/register.vue'
import Login from '../views/panel/login.vue'
import Verify from '../views/panel/verify.vue'
import Transfer from '../views/service/transfer.vue'
import Airtime from '../views/service/airtime.vue'
import Data from '../views/service/data.vue'
import SingleData from '../views/service/single-data.vue'

import Single from '../views/service/single-airtime.vue'
import Deposit from '../views/fund/deposit.vue'
import Account from '../views/fund/account.vue'
import Bill from '../views/service/bill.vue'
import Cable from '../views/service/cable.vue'
import API from '../views/service/api.vue'
import Payment from '../views/makepayment/payment.vue'
import Payment2 from '../views/makepayment/payment2.vue'
import Payment3 from '../views/makepayment/payment3.vue'
import Payment4 from '../views/makepayment/paymentwithschedule.vue'
import Payment5 from '../views/makepayment/datawithschedule.vue'
import Send from '../views/makepayment/sendmoney.vue'
import Home from '../views/home.vue'

import Settings from '../views/setting/user-settings.vue'
import Edit from '../views/setting/edit-profile.vue'
import Fund from '../views/fund/fund.vue'
import Refer from '../views/user/refer.vue'
import Reward from '../views/user/referral-reward.vue'
import Transaction from '../views/user/transaction.vue'
import Details from '../views/user/transaction-details.vue'
import SDetails from '../views/user/schedules-details.vue'
import Reset from '../views/forget/reset.vue'
import ResetPassword from '../views/forget/resetpassword.vue'

const routes = [{
        path: '/account/dashboard',
        name: 'TAPIT | Dashboard',
        component: Dashboard
    },
    {
        path: '/panel/register',
        name: 'TAPIT | Register',
        component: Register
    },
    {
        path: '/panel/login',
        name: 'TAPIT | Login',
        component: Login
    },
    {
        path: '/panel/verify',
        name: 'TAPIT | verify',
        component: Verify
    },
    {
        path: '/service/transfer',
        name: 'TAPIT | Transfer',
        component: Transfer
    },
    {
        path: '/service/airtime',
        name: 'TAPIT | Airtime',
        component: Airtime
    },
    {
        path: '/fund/deposit',
        name: 'TAPIT | Deposit Fund',
        component: Deposit 
    },
    {
        path: '/service/single-airtime',
        name: 'TAPIT | Single Recharge',
        component: Single
    },
    {
        path: '/service/single-data',
        name: 'TAPIT | Single Data',
        component: SingleData
    },
    {
        path: '/fund/account',
        name: 'TAPIT | Account',
        component: Account
    },
    {
        path: '/service/data',
        name: 'TAPIT | Data',
        component: Data
    },
    {
        path: '/service/bill',
        name: 'TAPIT | Bill',
        component: Bill
    },
    {
        path: '/service/cable',
        name: 'TAPIT | Cable',
        component: Cable
    },
    {
        path: '/service/api',
        name: 'TAPIT | API',
        component: API
    },
    {
        path: '/makepayment/payment',
        name: 'TAPIT | Payment',
        component: Payment
    },
    {
        path: '/makepayment/payment2',
        name: 'TAPIT | Payment2',
        component: Payment2
    },
    {
        path: '/makepayment/payment3',
        name: 'TAPIT | Payment3',
        component: Payment3
    },
    {
        path: '/makepayment/sendmoney',
        name: 'TAPIT | Send Money',
        component: Send
    },
    {
        path: '/makepayment/paymentwithschedule',
        name: 'TAPIT | Payment With Schedule',
        component: Payment4
    },
    {
        path: '/makepayment/datawithschedule',
        name: 'TAPIT | Data With Schedule',
        component: Payment5
    },
    {
        path: '/setting/user-settings',
        name: 'TAPIT | Settings',
        component: Settings
    },
    {
        path: '/setting/edit-profile',
        name: 'TAPIT | Edit Profile',
        component: Edit
    },
    {
        path: '/fund/fund',
        name: 'TAPIT | Deposit Funds',
        component: Fund
    },
    {
        path: '/user/refer',
        name: 'TAPIT | Refer',
        component: Refer
    },
    {
        path: '/user/referral-reward',
        name: 'TAPIT | Reward',
        component: Reward
    },
    {
        path: '/user/transaction',
        name: 'TAPIT | Transaction',
        component: Transaction
    },
    {
        path: '/user/transaction-details/:ref',
        name: 'TAPIT | Details',
        component: Details
    },
    {
        path: '/user/schedules-details/',
        name: 'TAPIT | Schedules-Details',
        component: SDetails
    },

    {
        path: '/forget/reset',
        name: 'TAPIT | Forget Password',
        component: Reset
    },
    {
        path: '/forget/resetpassword',
        name: 'TAPIT | Reset Password',
        component: ResetPassword
    },
    {
        path: '/',
        name: 'Tapit | Home',
        component: Home
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})



router.beforeEach((to, from, next) => {

    document.title = `${ to.name}`
    next()


    // to and from are both route objects. must call `next`.
})



  
 
export default router