package org.example.morningstar;

@SuppressWarnings("unused")
public class InputBoxes {
    public static final int[][][] US = {
            { // Large Cap Value Index Fund
                    {27, 32, 8},
                    {11, 14, 3},
                    {2, 2, 0}
            },
            { // S&P 500 Index Fund
                    {17, 29, 37},
                    {5, 9, 3},
                    {0, 0, 0}
            },
            { // S&P MidCap 400 Index Fund
                    {0, 0, 0},
                    {10, 17, 13},
                    {17, 31, 11}
            },
            { // Small Cap Index Fund
                    {0, 0, 0},
                    {0, 1, 3},
                    {27, 42, 27}
            },
    };

    public static final int[][][] INTERNATIONAL = {
            { // Large Cap Index Fund
                    {28, 32, 26},
                    {5, 5, 4},
                    {0, 0, 0}
            },
            { // Small Cap Index Fund
                    {0, 1, 0},
                    {19, 27, 16},
                    {11, 17, 10}
            },
    };
}
