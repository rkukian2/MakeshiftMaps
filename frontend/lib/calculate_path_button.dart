import 'package:flutter/material.dart';
import 'package:frontend/city_graph.dart';
import 'package:frontend/fetch_data.dart';

//provides input fields and a button to calculate the shortest path between two cities.
class CalculatePathButton extends StatefulWidget {
  final Future<void> Function(String, String) calculateFunction;
  const CalculatePathButton({required this.calculateFunction});

  @override
  State<CalculatePathButton> createState() => _CalculatePathButtonState();
}

class _CalculatePathButtonState extends State<CalculatePathButton> {
  // Controllers for input fields where users enter the start and end cities
  TextEditingController startCityController = TextEditingController();
  TextEditingController endCityController = TextEditingController();


  List<String> shortestPath = [];  // List to hold cities in the shortest path
  List<Map<String, dynamic>>? cities = [];// List to hold all cities
  Set<String> shortestPathSet = {}; // set to store the cities that are in shortest path

  @override
  void initState() {
    super.initState();
    _loadCities();
  }

  Future<void> _loadCities() async {
    final loadedCities = await fetchAllCities();
    setState(() {
      cities = loadedCities;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 800,
      child: Column(
        children: [
          Row(
            children: [
              Expanded(// TextField for entering the start city
                  child: TextField(
                controller: startCityController,
                decoration: const InputDecoration(labelText: 'Start'),
              )),
              SizedBox(//spacing
                width: 10,
              ),
              Expanded(// TextField for entering the destination city
                  child: TextField(
                controller: endCityController,
                decoration: const InputDecoration(labelText: 'Destination'),
              )),
            ],
          ),
          const SizedBox(
            height: 10,
          ),
          ElevatedButton(// calculate button
              onPressed: () async {
                try {
                  final path = await calculateShortestPath(
                      startCityController.text, endCityController.text);
                  setState(() {
                    shortestPath = path;
                  });
                } catch (e) {
                  print('error: $e');
                }
              },
              child: const Text('calculate shortest path'),
              ),
          shortestPath.isNotEmpty // display shortest path if available
              ? Text('Shortest path: ${shortestPath.join(" -> ")}')
              : const SizedBox.shrink(),
          // Display graph with colored shortest path    
          Flexible(
              child: CityGraph(
                  cities!.map((city) => city['name'] as String).toList(),
                  shortestPath),),
        ],
      ),
    );
  }
}
