import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Arcticle } from "../types/types";

const ArticleCard = ({ article }: { article: Arcticle }) => {
  const handlePress = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={handlePress}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
        {article.description ? (
          <Text style={styles.description} numberOfLines={3}>{article.description}</Text>
        ) : null}
        <View style={styles.footer}>
          {article.author ? <Text style={styles.author}>{article.author}</Text> : null}
          {article.publishedAt ? (
            <Text style={styles.date}>{new Date(article.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 18,
    marginHorizontal: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 170,
    backgroundColor: '#eaeaea',
  },
  imagePlaceholder: {
    width: '100%',
    height: 170,
    backgroundColor: '#eaeaea',
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#444',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  author: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    flex: 1,
    marginRight: 8,
  },
  date: {
    fontSize: 13,
    color: '#aaa',
  },
});

export { ArticleCard };

