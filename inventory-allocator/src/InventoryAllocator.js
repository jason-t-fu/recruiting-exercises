
class InventoryAllocator {

  constructor(order, warehouses) {
    this.order = order;
    this.warehouses = warehouses;
  }

  calculateInventory() {
    const result = [];

    for (let warehouse of this.warehouses) {
      const warehouseInv = {
        [warehouse.name]: {}
      };
      for (let item in this.order) {
        if (warehouse.inventory[item] && this.order[item]) {
          const numItems = Math.min(this.order[item], warehouse.inventory[item]);
          this.order[item] -= numItems;
          if (!this.order[item]) delete this.order[item];
          warehouse.inventory[item] -= numItems;
          warehouseInv[warehouse.name][item] = numItems;
        }
      }
      if (Object.keys(warehouseInv[warehouse.name]).length) result.push(warehouseInv);
    }
    if (Object.keys(this.order).length) return [];
    return result;
  }
}
module.exports = InventoryAllocator;

// Input: { apple: 10 }, [{ name: owd, inventory: { apple: 5 } }, { name: dm, inventory: { apple: 5 }}]
// Output: [{ dm: { apple: 5 } }, { owd: { apple: 5 } }]