from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample recipe data
recipes = [
    {
        "name": "Masala Maggi",
        "ingredients": ["maggi", "onion", "tomato"],
        "budget": 20,
        "category": "Quick"
    },
    {
        "name": "Aloo Sandwich",
        "ingredients": ["bread", "potato", "onion"],
        "budget": 30,
        "category": "Snack"
    },
    {
        "name": "Veg Fried Rice",
        "ingredients": ["rice", "carrot", "onion", "peas"],
        "budget": 50,
        "category": "Main Course"
    }
]


@app.route("/")
def home():
    return "WhatCanICook Python Backend is Running!"


@app.route("/recipes", methods=["GET"])
def get_recipes():
    return jsonify(recipes)


@app.route("/find-recipes", methods=["POST"])
def find_recipes():

    data = request.get_json()

    user_ingredients = data.get("ingredients", [])

    user_ingredients = [
        ingredient.lower().strip()
        for ingredient in user_ingredients
    ]

    matched_recipes = []

    for recipe in recipes:

        recipe_ingredients = [
            ingredient.lower()
            for ingredient in recipe["ingredients"]
        ]

        matched = set(user_ingredients) & set(recipe_ingredients)

        if matched:
            matched_recipes.append({
                "name": recipe["name"],
                "matched_ingredients": list(matched),
                "budget": recipe["budget"],
                "category": recipe["category"]
            })

    return jsonify(matched_recipes)

@app.route("/api/search", methods=["POST"])
def api_search():

    data = request.get_json()

    ingredients = data.get("ingredients", [])

    print("Website se ingredients aaye:", ingredients)

    return jsonify({
        "success": True,
        "message": "Ingredients received by Python",
        "ingredients": ingredients,
        "count": len(ingredients)
    })


if __name__ == "__main__":
    app.run(debug=True)