var app = new Vue({
	el: '#app',
	data: {
		brand: 'Vue Mastery',
		product: 'Socks',
		description: 'A pair of warm, fuzzy socks',
		image: './assets/vmSocks-green-onWhite.jpg',
		link: 'http://google.com',
		inStock: true,
		stoktaVar : 0,
		details : ["%80 cotton", "%20 polyester", "Gender Natural"],
		variants: [
	      {
	        variantId: 2234,
	        variantColor: 'green',
	        variantImage: './assets/vmSocks-green-onWhite.jpg'
	      },
	      {
	        variantId: 2235,
	        variantColor: 'blue',
	        variantImage: './assets/vmSocks-blue-onWhite.jpg'
	      }
	    ],
	    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
	    cart: 0,
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
		updateProduct(img){
			this.image = img
		}
	},
	computed : {
		title(){
			return this.brand + ' ' + this.product
		}
	}
})