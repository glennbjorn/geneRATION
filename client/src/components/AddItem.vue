<template>
    <form @submit="onSubmit" class="add-form">
        <div class="form-control">
            <label>Item & Description</label>
            <input 
                type="text" 
                v-model="item"
                name="item" 
                placeholder="e.g. White Rice (5kg)"
            />
        </div>
        <div class="form-control">
            <label>Quantity</label>
            <input 
                type="text" 
                v-model="qty"
                name="qty" 
                placeholder="Please indicate a whole number"
            />
        </div>

        <input 
            type="submit" 
            value="Save Item" 
            class="btn-block"
        />
    </form>
</template>

<script>
export default {
    name:'AddItem',
    data() {
        return {
            item: '',
            qty: '',
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()

            if(!this.item) {
                this.$swal('Please add an item')
                return
            }

            if(!this.qty) {
                this.$swal('Please add a quantity')
                return
            }

            const newItem = {
                item: this.item,
                qty: this.qty,
            }

            this.$emit('add-item', newItem)

            this.item = ''
            this.qty = ''
        }
    }
}
</script>


<style scoped>
.add-form {
    margin-bottom: 40px;
}

.form-control {
    margin: 20px 0;
}

.form-control label {
    display: block;
}

.form-control input {
    width: 100%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
}

.form-control-check {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form-control-check label {
    flex: 1;
}

.form-control-check input {
    flex: 2;
    height: 20px;
}

.btn-block {
    padding: 3px 7px;
}
</style>