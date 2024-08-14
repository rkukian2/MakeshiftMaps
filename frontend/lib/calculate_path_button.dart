import 'package:flutter/material.dart';
import 'package:frontend/city_graph.dart';
import 'package:frontend/fetch_data.dart';

class CalculatePathButton extends StatefulWidget {
  final Future<void> Function(String, String) calculateFunction;
  const CalculatePathButton({required this.calculateFunction});

  @override
  State<CalculatePathButton> createState() => _CalculatePathButtonState();
}

class _CalculatePathButtonState extends State<CalculatePathButton> {
  TextEditingController startCityController = TextEditingController();
  TextEditingController endCityController = TextEditingController();

  List<String> shortestPath = [];
  List<Map<String, dynamic>>? cities = [];
  Set<String> shortestPathSet = {};

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
              Expanded(
                  child: TextField(
                controller: startCityController,
                decoration: const InputDecoration(labelText: 'Start'),
              )),
              SizedBox(
                width: 10,
              ),
              Expanded(
                  child: TextField(
                controller: endCityController,
                decoration: const InputDecoration(labelText: 'Destination'),
              )),
            ],
          ),
          const SizedBox(
            height: 10,
          ),
          ElevatedButton(
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
          shortestPath.isNotEmpty
              ? Text('Shortest path: ${shortestPath.join(" -> ")}')
              : const SizedBox.shrink(),
          Flexible(
              child: CityGraph(
                  cities!.map((city) => city['name'] as String).toList(),
                  shortestPath),),
        ],
      ),
    );
  }
}
