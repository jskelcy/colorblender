function balanceCheck(curr){
   //base case
    if(curr === undefined){
        return 0;
    }
    var leftHeight = balanceCheck(curr.leftChild);
    var rightHeight  = balanceCheck(curr.rightChild);
    //pass failure up stack
    if(leftChild === -1 || rightChild === -1){
        return -1;
    }

    if(Math.abs(rightHeight - leftHeight) <=1){
        //subtree is balanced 
        return(Math.max(rightHeight,leftHeight)+1);
    }else{
        //subtree is not balanced
        return -1;
    }
}

(function () {
    balanceCheck(tree.root);
})(); 