Vue.component("product-details", {
	props: {
	    details: {
	      type: Array,
	      required: true
	    }
	},
	template:`<div><h2>Details</h2>
		<ul>
			<li v-for="detail in details">{{detail}}</li>
		</ul>
	</div>`
})

Vue.component("product", {
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
		    onSale: true,
		    reviews: []
		}
	},
	props: {
		premium:{
			type: Boolean,
			required : true
		}
	},
	template : `<div class="product">
	
		<div class="product-image">
			<img v-bind:src="image" alt="">
		</div>

		<div class="product-info">
			<h1>{{ title }}</h1>
			
			<p>{{description}}</p>
			
			<hr />

			<p>{{ sale }}</p>
			
			<hr />

			<p>Shipping: {{shipping}}</p>
			
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

			<product-details :details="details"></product-details>
			
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

			<button v-on:click="removeFromCart">Remote from cart</button>

			<div>
				<h2>Reviews</h2>
				<p v-if="!reviews.length">There are no reviews yet...</p>
				<ul>
					<li v-for="review in reviews">
						<p>Name: {{review.name}}</p>
						<p>My rating: {{review.rating}}</p>
						<p>My review: {{review.review}}</p>
						<p>Recommend? {{review.recommend}}</p>
					</li>
				</ul>
			</div>

			<product-review @review-submitted="addReview"></product-review>

		</div>
	</div>`,
	methods: {
		addToCart(){
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
		},
		removeFromCart(){
			this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
		},
		updateProduct(index){
			this.selectedVariant = index
			console.log(index)
		},
		addReview(productReview){
			this.reviews.push(productReview)
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
		},
		shipping(){
			if(this.premium){
				return "Free"
			}
			return 2.99
		}
	}
})

Vue.component('product-review', {
	template: `
		<form class="review-form" @submit.prevent="onSubmit">

			<p v-if="errors.length">
				<strong>Please correct following errors:</strong>
				<ul>
					<li v-for="error in errors">{{error}}</li>
				</ul>
			</p>

			<p>
				<label for="name">Name:</label>
				<input id="name" v-model="name" placeholder="name">
			</p>

			<p>
				<label for="review">Review:</label>      
				<textarea id="review" v-model="review"></textarea>
			</p>

			<p>
				<label for="rating">Rating:</label>
				<select id="rating" v-model.number="rating">
				  <option>5</option>
				  <option>4</option>
				  <option>3</option>
				  <option>2</option>
				  <option>1</option>
				</select>
			</p>

			<p>
				<label>Would you recommend this product?</label>
				<div>
					<label>Yes <input type="radio" name="recommend" value="yes" v-model="recommend" style="width:auto" /></label>
					<label>No <input type="radio" name="recommend" value="no" v-model="recommend" style="width:auto"/></label>
				</div>
			</p>
			  
			<p>
				<input type="submit" value="Submit">  
			</p>    
	    
	    </form>
	`,
	data(){
		return {
			name: null,
			review: null,
			rating: 0,
			errors: [],
			recommend: null
		}
	},
	methods:{
		onSubmit(){
			this.errors = []

			if (this.name && this.review && this.rating && this.recommend) {
				let productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating,
					recommend : this.recommend
				}

				this.$emit('review-submitted', productReview)
				
				this.name = null
				this.review = null
				this.rating = 0
				this.recommend = null
			} else {
				if(!this.name) this.errors.push("Name required")
				if(!this.review) this.errors.push("review required")
				if(!this.rating) this.errors.push("rating required")
				if(!this.recommend) this.errors.push("recommend required")
			}
		}
	}
})

var app = new Vue({
	el: '#app',
	data: {
		premium : false,
		cart: [],
	},
	methods:{
		updateCart(id){
			this.cart.push(id)
		},
		removeFromCart(id){
			const result = this.cart.filter(item => item !== id)
			this.cart = result;
		}
	}
})