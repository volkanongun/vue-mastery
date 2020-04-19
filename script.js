Vue.component("product", {
	template : `<div class="product">
	
		<div class="product-image">
			<img v-bind:src="image" alt="">
		</div>

		<div class="product-info">
			<h1>{{ title }}</h1>
			<div class="cart">
				<p>Cart ({{cart}})</p>
			</div>
			<p>{{description}}</p>
			<hr />
			<p>{{ sale }}</p>
			<hr />
			<a v-bind:href="link">Search Details</a>
			<hr />
			<p v-if="inStock">In stock</p>
			<p v-else :class="{outOfStock : !inStock}">Out of stock</p>
			<hr />
			<p v-if="stoktaVar > 10">Stokta var</p>
			<p v-else-if="stoktaVar < 10 && stoktaVar > 0">Az kaldı</p>				
			<p v-else="stoktaVar === 0">Bitdi</p>
			<hr />
			<h2>Details</h2>
			<ul>
				<li v-for="detail in details">{{detail}}</li>
			</ul>
			<hr />
			<h2>Variants</h2>
			<ul>
				<li v-for="(variant, index) in variants" 
					:key="variant.variantId"
					class="color-box"
					:style="{ backgroundColor: variant.variantColor }"
					@mouseover="updateProduct(index)">
				</li>
			</ul>
			<hr />
			<h2>Sizes</h2>
			<ul>
				<li v-for="size in sizes">{{ size }}</li>
			</ul>

			<button v-on:click="addToCart" 
					:disabled="!inStock"
					:class="{disabledButton : !inStock}">Add to cart</button>

			<button @click="removeFromCart">Remote from cart</button>
		</div>
	</div>`,
	data (){
		return {
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
		}
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

var app = new Vue({
	el: '#app'
})