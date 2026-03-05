# frozen_string_literal: true

module Api
  class ProductsController < ApplicationController
    def index
      products = Product.order(created_at: :desc)
      render json: products
    end

    def show
      product = Product.find(params[:id])
      render json: product
    end

    def create
      product = Product.new(product_params)
      
      product.source = "manual" if product.source.blank?
      product.external_id = SecureRandom.uuid if product.source == "manual" 

      if product.save
        render json: product, status: :created
      else
        render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def product_params
      params.require(:product).permit(:source, :external_id, :name, :image_url, :product_url)
    end
  end
end