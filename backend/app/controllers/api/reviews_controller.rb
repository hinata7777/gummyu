# frozen_string_literal: true

module Api
  class ReviewsController < ApplicationController
    def index
      product = Product.find(params[:product_id])
      reviews = product.reviews.order(created_at: :desc)
      render json: reviews
    end

    def show
      product = Product.find(params[:product_id])
      review = product.reviews.find(params[:id])
      render json: review
    end

    def create
      product = Product.find(params[:product_id])
      review = product.reviews.new(review_params)

      if review.save
        render json: review, status: :created
      else
        render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def review_params
      params.require(:review).permit(:body, :flavor_rating, :texture_rating, :hardness_level)
    end
  end
end