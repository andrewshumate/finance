package org.example.morningstar;

import org.junit.jupiter.api.Test;

import static org.example.morningstar.MorningStarTargetCalculator.computeResultingBox;
import static org.example.morningstar.MorningStarTargetCalculator.computeWeights;
import static org.junit.jupiter.api.Assertions.assertEquals;

class MorningStarTargetCalculatorTest {
    private static final double DELTA = 0.001;  // Maximum allowed difference for double equality

    @Test
    void test1() {
        int[][][] inputBoxes = {
                {
                        {0, 29, 45},
                        {67, 7, 15},
                        {63, 81, 55}
                },
                {
                        {76, 58, 70},
                        {37, 38, 73},
                        {41, 15, 34},
                },
                {
                        {47, 36, 8},
                        {19, 78, 35},
                        {19, 27, 34},
                }
        };
        int[][] targetBox = {
                {41, 41, 41},
                {41, 41, 41},
                {41, 41, 41}
        };

        // Verify the weights
        double[] weights = computeWeights(inputBoxes, targetBox);
        for (int j = 0; j < inputBoxes.length; j++) {
            assertEquals(weights[j], 1.0 / 3.0, DELTA);
        }

        // Verify the resulting box
        double[][] resultingBox = computeResultingBox(inputBoxes, weights);
        for (int i = 0; i < targetBox.length; i++) {
            for (int j = 0; j < targetBox[i].length; j++) {
                assertEquals(targetBox[i][j], resultingBox[i][j], DELTA);
            }
        }
    }

    @Test
    void test2() {
        int[][][] inputBoxes = {
                {
                        {99, 98, 97},
                        {96, 95, 94},
                        {93, 92, 91}
                },
                {
                        {1, 2, 3},
                        {4, 5, 6},
                        {7, 8, 9},
                },
        };
        int[][] targetBox = {
                {50, 50, 50},
                {50, 50, 50},
                {50, 50, 50}
        };

        // Verify the weights
        double[] weights = computeWeights(inputBoxes, targetBox);
        for (int j = 0; j < inputBoxes.length; j++) {
            assertEquals(weights[j], 0.5, DELTA);
        }

        // Verify the resulting box
        double[][] resultingBox = computeResultingBox(inputBoxes, weights);
        for (int i = 0; i < targetBox.length; i++) {
            for (int j = 0; j < targetBox[i].length; j++) {
                assertEquals(targetBox[i][j], resultingBox[i][j], DELTA);
            }
        }
    }

    @Test
    void test3() {
        int[][][] inputBoxes = {
                { // SP 500
                        {17, 29, 37},
                        {5, 9, 3},
                        {0, 0, 0}
                },
                { // SP 400
                        {0, 0, 0},
                        {10, 18, 13},
                        {16, 32, 11}
                },
                { // SP 600
                        {0, 0, 0},
                        {0, 0, 0},
                        {31, 50, 19}
                },
        };
        int[][] targetBox = { // SP 1500
                {16, 27, 34},
                {5, 9, 3},
                {2, 3, 1}
        };

        // Verify the weights
        double[] weights = computeWeights(inputBoxes, targetBox);
        assertEquals(weights[0], 0.92, 0.01);  // Larger delta since this is real-world data
        assertEquals(weights[1], 0.04, 0.01);
        assertEquals(weights[2], 0.04, 0.01);

        // Verify the resulting box
        double[][] resultingBox = computeResultingBox(inputBoxes, weights);
        for (int i = 0; i < targetBox.length; i++) {
            for (int j = 0; j < targetBox[i].length; j++) {
                assertEquals(targetBox[i][j], resultingBox[i][j], 0.5);
            }
        }
    }
}
