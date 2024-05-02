(function(window) {

    let sorts = {};

    function swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    sorts.removeUndefined = function (array) {
        var undefinedCount = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === undefined) {
                undefinedCount++;
                array.splice(i, 1);
                i--;
            }
        }
        console.log('-------------------------------------------');
        console.log('Undefined elements removed:', undefinedCount);
        console.log('-------------------------------------------');
        return undefinedCount;
    }

    sorts.bubbleSort = function (array, order) {
        var comparisons = 0;
        var swaps = 0;
        var n = array.length;

        for (var i = 0; i < n - 1; i++) {
            for (var j = 0; j < n - i - 1; j++) {
                comparisons++;
                if ((order === 'asc' && array[j] > array[j + 1]) || (order === 'desc' && array[j] < array[j + 1])) {
                    swap(array, j, j + 1);
                    swaps++;
                }
            }
        }

        console.log('Bubble Sort: Comparisons -', comparisons, ', Swaps -', swaps);
        console.log('Sorted Array:', array);
    }

    sorts.selectionSort = function (array, order) {
        var comparisons = 0;
        var swaps = 0;
        var n = array.length;

        for (var i = 0; i < n - 1; i++) {
            var minIndex = i;
            for (var j = i + 1; j < n; j++) {
                comparisons++;
                if ((order === 'asc' && array[j] < array[minIndex]) || (order === 'desc' && array[j] > array[minIndex])) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                swap(array, i, minIndex);
                swaps++;
            }
        }

        console.log('Selection Sort: Comparisons -', comparisons, ', Swaps -', swaps);
        console.log('Sorted Array:', array);
    }

    sorts.insertionSort = function (array, order) {
        var comparisons = 0;
        var swaps = 0;
        var n = array.length;

        for (var i = 1; i < n; i++) {
            var current = array[i];
            var j = i - 1;

            while (j >= 0 && ((order === 'asc' && array[j] > current) || (order === 'desc' && array[j] < current))) {
                comparisons++;
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = current;
            swaps++;
        }

        console.log('Insertion Sort: Comparisons -', comparisons, ', Swaps -', swaps);
        console.log('Sorted Array:', array);
    }

    sorts.shellSort = function (array, order) {
        var comparisons = 0;
        var swaps = 0;
        var n = array.length;
        var gap = Math.floor(n / 2);

        while (gap > 0) {
            for (var i = gap; i < n; i++) {
                var temp = array[i];
                var j = i;

                while (j >= gap && ((order === 'asc' && array[j - gap] > temp) || (order === 'desc' && array[j - gap] < temp))) {
                    comparisons++;
                    array[j] = array[j - gap];
                    j -= gap;
                }
                array[j] = temp;
                swaps++;
            }
            gap = Math.floor(gap / 2);
        }

        console.log('Shell Sort: Comparisons -', comparisons, ', Swaps -', swaps);
        console.log('Sorted Array:', array);
    }

    sorts.quickSort = function (array, order) {
        function partition(array, low, high) {
            var pivot = array[Math.floor((low + high) / 2)];
            var i = low - 1;
            var j = high + 1;

            while (true) {
                do {
                    i++;
                    comparisons++;
                } while ((order === 'asc' && array[i] < pivot) || (order === 'desc' && array[i] > pivot));

                do {
                    j--;
                    comparisons++;
                } while ((order === 'asc' && array[j] > pivot) || (order === 'desc' && array[j] < pivot));

                if (i >= j) return j;

                swap(array, i, j);
                swaps++;
            }
        }

        function quickSortHelper(array, low, high) {
            if (low < high) {
                var partitionIndex = partition(array, low, high);
                quickSortHelper(array, low, partitionIndex);
                quickSortHelper(array, partitionIndex + 1, high);
            }
        }

        var comparisons = 0;
        var swaps = 0;
        quickSortHelper(array, 0, array.length - 1);
        console.log('Quick Sort: Comparisons -', comparisons, ', Swaps -', swaps);
        console.log('Sorted Array:', array);
    }

    window.sorts = sorts;

})(window);