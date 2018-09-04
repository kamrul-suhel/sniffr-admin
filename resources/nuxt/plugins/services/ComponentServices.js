export default class ComponentServices {
    checkOrderExists(orders, user) {
        var ordered = false;

        orders.forEach((order) => {
            if (order.client_id == user.client_id) {
                ordered = true;
            }
        });

        return ordered;
    }
}