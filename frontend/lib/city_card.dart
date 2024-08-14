import 'package:flutter/material.dart';

class CityCard extends StatelessWidget {
  final String cityName;
  final bool isInShortestPath;

  const CityCard({required this.cityName, required this.isInShortestPath});

  @override
  Widget build(BuildContext context) {
    final cardColor = isInShortestPath ? Colors.green : Colors.red;

    return Card(
      color: cardColor,
      child: ListTile(
        title: Text(
          cityName,
          style: TextStyle(
              color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
