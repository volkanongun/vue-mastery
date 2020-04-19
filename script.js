var app = new Vue({
	el: '#app',
	data: {
		brand: 'Vue Mastery',
		product: 'Socks',
		description: 'A pair of warm, fuzzy socks',
		selectedVariant: 0,
		link: 'http://google.com',
		stoktaVar : 0,
		details : ["%80 cotton", "%20 polyester", "Gender Natural"],
		variants: [
	      {
	        variantId: 2234,
	        variantColor: 'green',
	        variantImage: './assets/vmSocks-green-onWhite.jpg',
	        variantQuantity : 10
	      },
	      {
	        variantId: 2235,
	        variantColor: 'blue',
	        variantImage: './assets/vmSocks-blue-onWhite.jpg',
	        variantQuantity : 0
	      }
	    ],
	    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
	    cart: 0,
	    onSale: true
	},
	methods: {
		addToCart(){
			this.cart += 1
		},
		removeFromCart(){
			this.cart -= 1

			if(this.cart <= 0){
				this.cart = 0;
			}
		},
		updateProduct(index){
			this.selectedVariant = index
			console.log(index)
		}
	},
	computed : {
		title(){
			return this.brand + ' ' + this.product
		},
		image(){
			return this.variants[this.selectedVariant].variantImage
		},
		inStock(){
			return this.variants[this.selectedVariant].variantQuantity
		},
		sale(){
			if(this.onSale) {
				return this.brand + ' ' + this.product + ' are on sale!'
			} else {
				return this.brand + ' ' + this.product + ' are not on sale'
			}
		}
	}
})