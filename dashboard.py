import streamlit as st
import pandas as pd

st.set_page_config(page_title="WhatCanICook? Dashboard", page_icon="🍳", layout="wide")

st.markdown("""
<style>
.stApp { background:#f7f4ec; }
[data-testid="stSidebar"] { background:#173f2a; }
[data-testid="stSidebar"] * { color:white !important; }
.title { font-size:42px; font-weight:800; color:#173f2a; }
.subtitle { color:#66756c; font-size:17px; margin-bottom:25px; }
.card { background:white; border:1px solid #e7e1d4; border-radius:18px; padding:20px; }
.value { color:#173f2a; font-size:30px; font-weight:800; }
.label { color:#68756d; font-size:14px; }
.section { color:#173f2a; font-size:25px; font-weight:750; margin:25px 0 12px; }
</style>
""", unsafe_allow_html=True)

recipes = pd.DataFrame({
    "Recipe":["Veg Sandwich","Paneer Masala","Veg Fried Rice","Aloo Paratha","Masala Pasta"],
    "Category":["Breakfast","Lunch","Dinner","Breakfast","Dinner"],
    "Time":["15 min","30 min","20 min","25 min","20 min"],
    "Budget":["₹30","₹70","₹40","₹35","₹50"]
})

ingredients = ["Potato","Onion","Tomato","Paneer","Rice","Bread","Milk","Capsicum"]

with st.sidebar:
    st.markdown("## 🍳 WhatCanICook?")
    st.caption("Smart Cooking for Hostel Life")
    st.divider()
    page = st.radio("MENU", [
        "🏠 Dashboard",
        "🥕 My Ingredients",
        "🍽️ Recipes",
        "🤖 AI Recipe Generator",
        "❤️ Favorites"
    ])

st.markdown('<div class="title">What Can I Cook?</div>', unsafe_allow_html=True)
st.markdown('<div class="subtitle">AI Recipe Recommendation Dashboard</div>', unsafe_allow_html=True)

if page == "🏠 Dashboard":
    st.markdown('<div class="section">📊 Dashboard Overview</div>', unsafe_allow_html=True)
    cols = st.columns(4)
    cards = [("🍳","Total Recipes","25"),("🥕","Ingredients","18"),("❤️","Favorites","7"),("🤖","AI Recipes","12")]
    for col, (icon,label,value) in zip(cols,cards):
        with col:
            st.markdown(f'<div class="card"><div>{icon}</div><div class="label">{label}</div><div class="value">{value}</div></div>', unsafe_allow_html=True)

    st.markdown('<div class="section">🍽️ Recent Recipes</div>', unsafe_allow_html=True)
    st.dataframe(recipes, use_container_width=True, hide_index=True)

    c1,c2 = st.columns(2)
    with c1:
        st.markdown('<div class="section">📈 Recipe Categories</div>', unsafe_allow_html=True)
        st.bar_chart(recipes["Category"].value_counts())
    with c2:
        st.markdown('<div class="section">💰 Recipe Budget</div>', unsafe_allow_html=True)
        st.bar_chart(pd.DataFrame({"Budget (₹)":[30,70,40,35,50]}, index=recipes["Recipe"]))

elif page == "🥕 My Ingredients":
    st.markdown('<div class="section">🥕 My Ingredients</div>', unsafe_allow_html=True)
    selected = st.multiselect("Select ingredients available in your kitchen", ingredients)
    if selected:
        st.success(f"{len(selected)} ingredient(s) selected.")
        st.dataframe(pd.DataFrame({"Ingredient":selected,"Status":["Available"]*len(selected)}), use_container_width=True, hide_index=True)
    else:
        st.info("Select ingredients to see them here.")

elif page == "🍽️ Recipes":
    st.markdown('<div class="section">🍽️ Recipe Explorer</div>', unsafe_allow_html=True)
    category = st.selectbox("Filter by category", ["All","Breakfast","Lunch","Dinner"])
    filtered = recipes if category == "All" else recipes[recipes["Category"] == category]
    st.dataframe(filtered, use_container_width=True, hide_index=True)

elif page == "🤖 AI Recipe Generator":
    st.markdown('<div class="section">🤖 AI Recipe Generator</div>', unsafe_allow_html=True)
    user_ingredients = st.text_area("Your ingredients", placeholder="Example: potato, onion, tomato, rice")
    if st.button("✨ Generate Recipe", use_container_width=True):
        if not user_ingredients.strip():
            st.warning("Please enter at least one ingredient.")
        else:
            st.success("Recipe request received!")
            st.subheader("🍳 Suggested Recipe")
            st.write("**Ingredients:**", user_ingredients)
            st.write("**Cooking flow:**")
            st.write("1. Prepare ingredients. 2. Heat the pan. 3. Add onion and spices. 4. Add remaining ingredients. 5. Cook and serve.")
            st.info("This section is ready to be connected to your AI API.")

elif page == "❤️ Favorites":
    st.markdown('<div class="section">❤️ Favorite Recipes</div>', unsafe_allow_html=True)
    st.dataframe(recipes.iloc[[1,2,3]], use_container_width=True, hide_index=True)
    st.info("Later this section can be connected to favorites saved by your HTML/JavaScript website.")
