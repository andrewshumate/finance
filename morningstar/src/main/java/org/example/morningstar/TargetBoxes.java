package org.example.morningstar;

@SuppressWarnings("unused")
public class TargetBoxes {
    // https://old.reddit.com/r/Bogleheads/comments/xtaxzx/
    public static final int[][] GLOBAL_BEN_FELIX_PORTFOLIO = {
            {15, 22, 21},
            {7, 9, 4},
            {11, 8, 2}
    };

    public static final int[][] GLOBAL_AVGE = {
            {19, 20, 14},
            {11, 11, 4},
            {9, 9, 3}
    };

    /**
     * AVGE but US only
     */
    public static final int[][] US_AVGE = {
            {17, 18, 18},
            {11, 11, 4},
            {11, 11, 4}
    };

    /**
     * AVGE but international only
     */
    public static final int[][] INTERNATIONAL_AVGE = {
            {29, 20, 10},
            {12, 12, 5},
            {5, 5, 2}
    };

    /**
     * AVUS
     */
    public static final int[][] US_AVANTIS = {
            {15, 20, 22},
            {10, 12, 5},
            {6, 7, 3}
    };

    /**
     * DFAC
     */
    public static final int[][] US_DFA = {
            {13, 20, 21},
            {9, 13, 5},
            {6, 9, 4}
    };

    /**
     * DFIC
     */
    public static final int[][] INTERNATIONAL_DFA = {
            {23, 19, 12},
            {13, 14, 7},
            {4, 5, 3}
    };

    /**
     * AVDE
     */
    public static final int[][] INTERNATIONAL_AVANTIS = {
            {25, 23, 14},
            {11, 12, 6},
            {3, 4, 2}
    };

    /**
     * VTI
     */
    public static final int[][] US_VANGUARD = {
            {15, 25, 31},
            {6, 9, 5},
            {3, 4, 2}
    };

    /**
     * VEA
     */
    public static final int[][] INTERNATIONAL_VANGUARD = {
            {25, 29, 22},
            {6, 8, 5},
            {2, 2, 1}
    };
}
