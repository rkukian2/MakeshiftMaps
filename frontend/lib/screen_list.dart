import 'package:flutter/material.dart';
import 'package:frontend/calculate_path_button.dart';
import 'package:frontend/fetch_data.dart';

class CityListScreen extends StatefulWidget {
  const CityListScreen({super.key});

  @override
  State<CityListScreen> createState() => _CityListScreenState();
}

class _CityListScreenState extends State<CityListScreen> {
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

  Future<void> _calculatePath(String startCity, String endCity) async {
    try {
      final path = await calculateShortestPath(startCity, endCity);
      print('shortest path: $path');

      setState(() {
        shortestPathSet = Set.from(path);
      });
    } catch (e) {
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: cities != null
            ? Padding(
                padding: const EdgeInsets.all(28.0),
                child: Column(children: [
                  const SizedBox(
                    height: 30,
                  ),
                  CalculatePathButton(calculateFunction: _calculatePath)
                ]),
              )
            : CircularProgressIndicator());
  }
}
