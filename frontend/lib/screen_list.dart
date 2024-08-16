import 'package:flutter/material.dart';
import 'package:frontend/calculate_path_button.dart';
import 'package:frontend/fetch_data.dart';

//Represents the main screen 
class CityListScreen extends StatefulWidget {
  const CityListScreen({super.key});

  @override
  State<CityListScreen> createState() => _CityListScreenState();
}

class _CityListScreenState extends State<CityListScreen> {
  // List to hold the cities fetched from db
  List<Map<String, dynamic>>? cities = [];
  //set to store cities that are part of the shortest path
  Set<String> shortestPathSet = {};

  @override
  void initState() {
    super.initState();
    _loadCities();// Load cities when the widget is initialized
  }

  // Fetches city data
  Future<void> _loadCities() async {
    final loadedCities = await fetchAllCities();
    setState(() {
      cities = loadedCities;
    });
  }

  // Calculates shortest path between two cities 
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
        // render UI based on whether city data has been loaded
        body: cities != null
            ? Padding(
                padding: const EdgeInsets.all(28.0),
                child: Column(children: [
                  const SizedBox(
                    height: 30,
                  ),
                  CalculatePathButton(calculateFunction: _calculatePath),//display calculate button and use _calculatePath functrion
                ]),
              )
            : CircularProgressIndicator());// Show loading indicator while cities are being fetched
  }
}
