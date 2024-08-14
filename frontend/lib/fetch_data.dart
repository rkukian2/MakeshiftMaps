import 'dart:convert';

import 'package:http/http.dart' as http;

Future<List<String>> calculateShortestPath(
    String startCity, String endCity) async {
  final response = await http.post(
      Uri.parse('http://localhost:3000/calculate-path'),
      headers: <String, String>{'Content-Type': 'application/json'},
      body: jsonEncode({'startCity': startCity, 'endCity': endCity}));

  if (response.statusCode == 200) {
    final decodedResponse = jsonDecode(response.body);
    return List<String>.from(decodedResponse['shortestPath']);
  } else {
    throw Exception('Failed response');
  }
}

Future<List<Map<String, dynamic>>> fetchAllCities() async {
  final response = await http.get(Uri.parse('http://localhost:3000/cities'));

  if (response.statusCode == 200) {
    return List<Map<String, dynamic>>.from(jsonDecode(response.body));
  } else {
    throw Exception('Failed response');
  }
}
