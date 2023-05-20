package org.example.morningstar;

import org.apache.commons.math3.linear.MatrixUtils;
import org.apache.commons.math3.linear.RealMatrix;

import java.util.Arrays;

public class MorningStarTargetCalculator {
    private static final int[][][] INPUT_BOXES = InputBoxes.US;
    private static final int[][] TARGET_BOX = TargetBoxes.US_AVGE;
    private static final int NUM_ROWS = 3;
    private static final int NUM_COLS = 3;

    public static void main(String[] args) {
        System.out.println("The weights are:");
        double[] weights = computeWeights(INPUT_BOXES, TARGET_BOX);
        for (double weight : weights) {
            System.out.printf("%5.2f%%\n", weight * 100);
        }

        System.out.println("\nThe resulting MorningStar box is:");
        double[][] resultingBox = computeResultingBox(INPUT_BOXES, weights);
        for (int i = 0; i < NUM_ROWS; i++) {
            for (int j = 0; j < NUM_COLS; j++) {
                System.out.printf("%5.2f  ", resultingBox[i][j]);
            }
            System.out.println();
        }
    }

    static double[] computeWeights(int[][][] inputBoxes, int[][] targetBox) {
        // Create a RealMatrix from the inputBoxes
        double[][] inputData = new double[NUM_ROWS * NUM_COLS][inputBoxes.length];
        for (int k = 0; k < inputBoxes.length; k++) {
            int[][] inputBox = inputBoxes[k];
            for (int i = 0; i < NUM_ROWS; i++) {
                for (int j = 0; j < NUM_COLS; j++) {
                    inputData[i * NUM_COLS + j][k] = inputBox[i][j];
                }
            }
        }
        RealMatrix X = MatrixUtils.createRealMatrix(inputData);

        // Create a RealMatrix from the targetBox
        double[] targetData = new double[NUM_ROWS * NUM_COLS];
        for (int i = 0; i < NUM_ROWS; i++) {
            for (int j = 0; j < NUM_COLS; j++) {
                targetData[i * NUM_COLS + j] = targetBox[i][j];
            }
        }
        RealMatrix Y = MatrixUtils.createColumnRealMatrix(targetData);

        // Do the math
        RealMatrix XtX = X.transpose().multiply(X);
        RealMatrix XtY = X.transpose().multiply(Y);
        double[] weights = MatrixUtils.inverse(XtX).multiply(XtY).getColumn(0);

        // Normalize the weights to add up to 100%
        double sum = Arrays.stream(weights).sum();
        for (int i = 0; i < weights.length; i++) {
            weights[i] /= sum;
        }
        return weights;
    }

    static double[][] computeResultingBox(int[][][] inputBoxes, double[] weights) {
        double[][] resultBox = new double[NUM_ROWS][NUM_COLS];
        for (int i = 0; i < NUM_ROWS; i++) {
            for (int j = 0; j < NUM_COLS; j++) {
                for (int k = 0; k < weights.length; k++) {
                    resultBox[i][j] += weights[k] * inputBoxes[k][i][j];
                }
            }
        }
        return resultBox;
    }
}
