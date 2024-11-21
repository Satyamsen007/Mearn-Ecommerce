import React from 'react'
import ReactStars from 'react-rating-stars-component'
function ReviewCard({ review }) {

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)", // Fixed: Added the closing parenthesis
    activeColor: "yellow",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };
  return <>
    <div class=" w-[20vmax] max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <div class="flex items-center mb-4">
        <img src="https://via.placeholder.com/40" alt="User Profile" class="w-10 h-10 rounded-full" />
        <div class="ml-3">
          <p class="font-semibold text-gray-800">{review.name}</p>
          <p class="text-sm text-gray-500">2 days ago</p>
        </div>
      </div>

      <div class="flex items-center mb-2">
        <ReactStars {...options} />
      </div>

      <p class="text-gray-600 text-sm mb-3">
        {review.comment}
      </p>

      <div class="flex items-center justify-between">
        <button class="text-blue-500 text-sm font-semibold hover:underline">Read More</button>
        <button class="text-gray-500 text-sm hover:text-gray-800">Helpful?</button>
      </div>
    </div>
  </>
}

export { ReviewCard }