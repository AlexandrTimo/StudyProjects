public class Machine implements Info {
    private int ID = 8;
    public void start(){
        System.out.println("Machine started!");
    }
    
    // Interface connection -> implements <interface name>
    public void showInfo() {
        System.out.println("Machine ID: " + ID);
    }
}
