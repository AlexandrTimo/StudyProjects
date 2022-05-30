public class interface_exp {
    public static void main(String[] args) {
        
        Human hum1 = new Human();
        Machine mach1 = new Machine();

        hum1.greet();
        mach1.start();

        // Run method via interface ->

        // exp 1 (Info as type)
        Info info1 = new Machine();
        info1.showInfo();
        // exp 2 (Info as type)
        Info info2 = hum1;
        info2.showInfo();
        // exp 3 
        outputInfo(mach1);
        outputInfo(hum1);
    }
    // exp 3 + extra method - (Info as type)
    private static void outputInfo(Info details){
        details.showInfo();
    }
}
