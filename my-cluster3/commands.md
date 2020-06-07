pvc-definition.yml:
accessModes:
ReadWriteOnce - volumen ma być dostępony na 1 nodzie,
ReadWriteMany - dla wielu,
ReadOnlyMany

kubectl apply -f ../my-cluster3/pvc-definition.yml
> persistentvolumeclaim/postgres-pvc created
kubectl get pvc
kubectl get pv


kubectl apply -f test-pvc-deployment.yml
> pod/test-pvc-pod created

kubectl get pods
kubectl delete pod test-pvc-pod
kubectl delete pvc postgres-pvc

kubectl get storageclasses
> NAME                 PROVISIONER          AGE


kubectl apply -f postgres-pvc.yml
kubectl apply -f postgres-deployment.yml
kubectl apply -f postgres-secret.yml
kubectl apply -f myapp-configMap.yml
kubectl get pvc
kubectl get deploy


kubectl delete deploy postgres-deployment
kubectl delete pvc postgres-pvc
