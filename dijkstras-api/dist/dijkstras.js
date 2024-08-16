"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dijkstra;
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    enqueue(vertex, priority) {
        this.heap.push({ vertex, priority });
        this.heapifyUp();
    }
    dequeue() {
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0 && last) {
            this.heap[0] = last;
            this.heapifyDown();
        }
        return min;
    }
    heapifyUp() {
        let index = this.heap.length - 1;
        const element = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (element.priority >= parent.priority)
                break;
            this.heap[index] = parent;
            index = parentIndex;
        }
        this.heap[index] = element;
    }
    heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if ((swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null)
                break;
            this.heap[index] = this.heap[swap];
            index = swap;
        }
        this.heap[index] = element;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}
function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();
    for (const vertex in graph) {
        if (vertex === start) {
            distances[vertex] = 0;
            pq.enqueue(vertex, 0);
        }
        else {
            distances[vertex] = Infinity;
        }
        previous[vertex] = null;
    }
    while (!pq.isEmpty()) {
        const { vertex: shortestVertex } = pq.dequeue();
        if (shortestVertex === end)
            break;
        for (const neighbor in graph[shortestVertex]) {
            const distance = graph[shortestVertex][neighbor];
            const alt = distances[shortestVertex] + distance;
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = shortestVertex;
                pq.enqueue(neighbor, alt);
            }
        }
    }
    const path = [];
    let current = end;
    while (current) {
        path.unshift(current);
        current = previous[current];
    }
    if (distances[end] === Infinity) {
        throw new Error(`No path found from ${start} to ${end}`);
    }
    return path;
}
//# sourceMappingURL=dijkstras.js.map