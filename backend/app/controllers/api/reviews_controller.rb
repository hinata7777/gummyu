# frozen_string_literal: true

module Api
  class ReviewsController < ApplicationController
    def index
      if params[:product_id].present?
        product = Product.find(params[:product_id])
        reviews = product.reviews.order(created_at: :desc)
        render json: reviews
      else
        reviews = Review.includes(:product).order(created_at: :desc).limit(50)
        render json: timeline_json(reviews)
      end
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

    def timeline_json(reviews)
      reviews.as_json(
        only: %i[id product_id body flavor_rating texture_rating hardness_level created_at],
        include: {
          product: {
            only: %i[id name source external_id image_url product_url]
          }
        }
      )
    end
  end
end