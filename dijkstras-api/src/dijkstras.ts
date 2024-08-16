// Priority Queue implemented with Min-Heap
class PriorityQueue {
    //Heap array
    private heap: { vertex: string, priority: number }[];

    constructor() {
        this.heap = [];
    }
    //method to add new vertex to pq with a priority
    enqueue(vertex: string, priority: number) {
        this.heap.push({ vertex, priority });
        this.heapifyUp();
    }
    //method to remove and return vertex with highest priority
    dequeue(): { vertex: string, priority: number } | undefined {
        const min = this.heap[0];//root has min priority
        const last = this.heap.pop();//remove last element
        if (this.heap.length > 0 && last) {
            this.heap[0] = last;//move last element to root
            this.heapifyDown();//maintain heap
        }
        return min;
    }
    //method to maintain heap
    heapifyUp() {
        let index = this.heap.length - 1;
        const element = this.heap[index];

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];

            if (element.priority >= parent.priority) break;

            this.heap[index] = parent;
            index = parentIndex;
        }
        this.heap[index] = element;
    }
    //method to maintain heap
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
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild!.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            index = swap;
        }
        this.heap[index] = element;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }
}

type Neighbors = Record<string, number>;
// Dijkstra's Algorithm to find the shortest path from a start vertex to an end vertex
export default function dijkstra(graph: Record<string, Neighbors>, start: string, end: string): string[] {
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const pq = new PriorityQueue();

    // Initialize distances and priority queue
    for (const vertex in graph) {
        if (vertex === start) {
            distances[vertex] = 0;
            pq.enqueue(vertex, 0);// Add the start vertex to the priority queue
        } else {
            distances[vertex] = Infinity;
        }
        previous[vertex] = null;// No previous vertex for start
    }

    // Process vertices until the queue is empty
    while (!pq.isEmpty()) {
        const { vertex: shortestVertex } = pq.dequeue()!;// Dequeue the vertex with the smallest distance

        if (shortestVertex === end) break;
        // Process each neighbor of the current vertex
        for (const neighbor in graph[shortestVertex]) {
            const distance = graph[shortestVertex][neighbor]; // Distance to the neighbor
            const alt = distances[shortestVertex] + distance; // Alternative path distance through the current vertex

            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;// Update the shortest distance to the neighbor
                previous[neighbor] = shortestVertex;// Update the previous vertex
                pq.enqueue(neighbor, alt);// Enqueue the neighbor
            }
        }
    }
    // Reconstruct the shortest path from the end vertex to the start vertex
    const path: string[] = [];
    let current: string | null = end;
    while (current) {
        path.unshift(current);
        current = previous[current];
    }

    //Check if valid path exists
    if (distances[end] === Infinity) {
        throw new Error(`No path found from ${start} to ${end}`);
    }

    return path;
}