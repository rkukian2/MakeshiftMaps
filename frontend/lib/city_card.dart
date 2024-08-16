import 'package:flutter/material.dart';

// Represents a city as a card with conditional coloring based on whether the city is part of the shortest path.
class CityCard extends StatelessWidget {
  final String cityName;
  final bool isInShortestPath;

//Constructor to initialize the CityCard with the required city name and path status
  const CityCard({required this.cityName, required this.isInShortestPath});

  @override
  Widget build(BuildContext context) {
    final cardColor = isInShortestPath ? Colors.green : Colors.grey; //determine color of card depending on whether its in path

    return Card(
      color: cardColor,
      child: ListTile(
        title: Text(
          cityName,//title card with cityName
          style: TextStyle(//style card text
              color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
