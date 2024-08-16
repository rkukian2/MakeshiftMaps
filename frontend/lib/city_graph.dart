import 'package:flutter/material.dart';
import 'package:frontend/city_card.dart';

// represents a grid of cities, where each city is a card and cities in the shortest path are colored
class CityGraph extends StatelessWidget {
  final List<String> cityNames;
  final List<String> shortestPathSet;

  CityGraph(this.cityNames, this.shortestPathSet);

  @override
  Widget build(BuildContext context) {
    print('Updated shortestPathSet: $shortestPathSet');

    return GridView.builder(
      gridDelegate:
          SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
      itemCount: cityNames.length,
      itemBuilder: (context, index) {
        final isInShortestPath = shortestPathSet.contains(cityNames[index]);
        return CityCard(
          cityName: cityNames[index],
          isInShortestPath: isInShortestPath,
        );
      },
    );
  }
}
