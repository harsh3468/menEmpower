import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
def get_scream_from_index(index):
	return df[df.index == index]["scream"].values[0]

def get_index_from_scream(scream):
	return df[df.scream == scream]["index"].values[0]

df = pd.read_csv("post_dataset.csv")


features = ['tags','body','likes']
for feature in features:
	df[feature] = df[feature].fillna('')

def combine_features(row):
	try:
		return row['tags'] +" "+row['body']+" "+row["likes"]
	except:
		print "Error:", row	

df["combined_features"] = df.apply(combine_features,axis=1)

cv = CountVectorizer()

count_matrix = cv.fit_transform(df["combined_features"])

cosine_sim = cosine_similarity(count_matrix) 
post_user_likes = "screamId"

post_index = get_index_from_scream(post_user_likes)

similar_posts =  list(enumerate(cosine_sim[post_index]))

sorted_similar_posts = sorted(similar_posts,key=lambda x:x[1],reverse=True)

i=0
for element in sorted_similar_posts:
		print get_scream_from_index(element[0])
		i=i+1
		if i>50:
			break